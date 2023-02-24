import React from "react";
import { useCurrentTasks } from "../hooks/useCurrentTasks";
import TaskListItem from "./TaskListItem";
import { tasksProps, taskType } from "../types/types";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { TasksListWrapper, StyledTasksList } from "./styles/TasksStyles";

export default function Tasks({ days }: tasksProps) {
  const dayTasks = useCurrentTasks(days);
  const { email } = useAuth();
  const currentDate = useAppSelector((state) => state.currentDay);
  const dispatch = useAppDispatch();

  async function handleChange(task: taskType) {
    await updateDoc(doc(db, `${email}/${currentDate.id}`), {
      tasks: dayTasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    });
  }

  async function handleDelete(task: taskType) {
    const newTasks = dayTasks.filter((t) => t.id !== task.id);
    if (newTasks.length === 0) {
      await deleteDoc(doc(db, `${email}/${currentDate.id}`));
      dispatch(setCurrentDay({ ...currentDate, id: "" }));
    } else {
      await updateDoc(doc(db, `${email}/${currentDate.id}`), {
        tasks: newTasks,
      });
    }
  }

  return (
    <TasksListWrapper>
      <h1>{dayTasks.length} Tasks today</h1>
      <StyledTasksList>
        {dayTasks?.sort(compare).map((task, index) => (
          <TaskListItem
            completed={task.completed}
            key={task.id}
            task={task}
            handleChange={handleChange}
            handleDelete={handleDelete}
          ></TaskListItem>
        ))}
      </StyledTasksList>
    </TasksListWrapper>
  );

  function compare(first: taskType, second: taskType): number {
    if (first.completed === true && second.completed === false) {
      return 1;
    }

    if (first.completed === false && second.completed === true) {
      return -1;
    }

    if (first.completed === second.completed) {
      return 0;
    }

    return 0;
  }
}
