import React, { Suspense, useState } from "react";
import { useCurrentTasks } from "../hooks/useCurrentTasks";
import TaskListItem from "./TaskListItem";
import styled from "styled-components";
import { taskType } from "../functions.ts/retrieveDays";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeTask, setTasks, updateTask } from "../store/slices/tasksSlice";
import { setCurrentDay } from "../store/slices/currentDaySlice";

const StyledTasksList = styled.ul`
  list-style: none;
`;

const TasksListWrapper = styled.div`
  height: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
type tasksProps = {
  days: any[];
};

export default function Tasks({ days }: tasksProps) {
  const dayTasks = useCurrentTasks(days);
  const { email } = useAuth();
  const currentDate = useAppSelector((state) => state.currentDay);
  const dispatch = useAppDispatch();

  async function handleChange(task: taskType) {
    await updateDoc(doc(db, `${email}/${currentDate.id}`), {
      tasks: dayTasks.map((t) => {
        if (t.id === task.id) {
          console.log('hete')
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    });
    dispatch(
      updateTask({ ...task, completed: task.completed, day: currentDate.day })
    );
  }

  async function handleDelete(task: taskType) {
    const newTasks = dayTasks.filter((t) => t.id !== task.id);
    if (newTasks.length === 0) {
      await deleteDoc(doc(db, `${email}/${currentDate.id}`));
      dispatch(setCurrentDay({ ...currentDate, id: "" }));
      dispatch(setTasks(days.filter(day => day.id !== currentDate.id)))
    } else {
      await updateDoc(doc(db, `${email}/${currentDate.id}`), {
        tasks: newTasks,
      });
    }

    dispatch(removeTask({ ...task, day: currentDate.day }));
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
    if(first.completed === true && second.completed === false){
      return 1;
    }

    if(first.completed === false && second.completed === true){
      return -1;
    }

    if(first.completed === second.completed){
      return 0;
    }

    return 0;
  }
}
