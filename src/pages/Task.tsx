import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { taskType } from "../functions.ts/retrieveDays";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setCurrentTask } from "../store/slices/currentTaskSlice";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { Bars } from "react-loader-spinner";
import { StyledTaskForm, StyledBackButton } from "./TaskStyles";


export default function Task() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const email = useAppSelector((state) => state.user.email);
  const { day, month, year, id } = useAppSelector((state) => state.currentDay);
  const { taskId, title, todo } = useAppSelector((state) => state.currentTask);
  const [loading, setLoading] = useState(false);

  const mode = taskId ? "Update" : "Save";
  const days = useAppSelector((state) => state.task.tasks);
  const currentDay = days.find((day) => day.id === id);
  const currentDayTasks: taskType[] = currentDay ? currentDay.tasks : [];
  console.log(currentDayTasks);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function updateTasks(data: any) {
    if (!taskId && id !== "") {
      updateExistedDoc(data);
    } else if (!taskId && !id) {
      addNewDoc(data);
    } else {
      updateExistedTask(data);
    }
  }
  function onSubmit(data: any) {
    //currDayId && taskId ->
    //currDayId !task ->
    //!currDayId !task
    setLoading(true);
    updateTasks(data).then(() => {
      reset();
      navigate("/");
      setLoading(false);
    });
  }

  return (
    <>
      <h1>{taskId ? "Update" : "New"} task</h1>
      <StyledTaskForm onSubmit={handleSubmit(onSubmit)}>
        <h3>Title: </h3>
        <input
          {...register("title", {
            required: "Enter title!",
          })}
          defaultValue={title}
        />

        <h3>Description: </h3>
        <textarea
          {...register("todo", {
            required: "Enter todo!",
          })}
          defaultValue={todo}
        />
        <div>
          <StyledBackButton onClick={() => navigate("/")}>
            Back
          </StyledBackButton>
          {loading ? (
            <Bars
              height="80"
              width="80"
              color="#fc6722"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <input type="submit" value={mode} />
          )}
        </div>
      </StyledTaskForm>
    </>
  );

  async function addNewDoc(data: any) {
    const docData = {
      day: day,
      month: month,
      year: year,
      tasks: [{ ...data, id: 1, completed: false }],
    };
    const newDocRef = doc(collection(db, email));
    await setDoc(newDocRef, docData);
    dispatch(setCurrentDay({ ...docData, id: newDocRef.id }));
  }

  async function updateExistedDoc(data: any) {
    const lastTask = currentDayTasks.at(-1);
    const lastTaskId = lastTask ? lastTask.id : 1;
    const newTasks = days.map((day) => {
      if (day === currentDay) {
        return {
          ...day,
          tasks: [
            ...day.tasks,
            { ...data, id: lastTaskId + 1, completed: false },
          ],
        };
      }

      return day;
    });
    await updateDoc(doc(db, `${email}/${id}`), {
      tasks: [
        ...currentDayTasks,
        { ...data, id: lastTaskId + 1, completed: false },
      ],
    });

  }

  async function updateExistedTask(data: any) {
    await updateDoc(doc(db, `${email}/${id}`), {
      tasks: currentDayTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: data.title,
            todo: data.todo,
          };
        }
        return task;
      }),
    });

    dispatch(setCurrentTask({ title: "", todo: "", id: 0 }));
  }
}
