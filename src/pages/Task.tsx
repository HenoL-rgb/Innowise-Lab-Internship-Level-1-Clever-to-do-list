import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import { useCurrentDay } from "../hooks/useCurrentDay";
import { useCurrentTasks } from "../hooks/useCurrentTasks";
import { useCurrentTask } from "../hooks/useCurrentTask";
import { taskType, useTasks } from "../hooks/useTasks";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { useAppDispatch } from "../hooks/redux-hooks";

export default function Task() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { isAuth, email } = useAuth();
  const { day, month, year, id } = useCurrentDay();

  const { taskId, title, todo } = useCurrentTask();

  const mode = taskId ? "Update" : "Save";
  const currentDay = useTasks(email).find((day) => day.id === id);
  const currentDayTasks: taskType[] = currentDay ? currentDay.tasks : [];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // function handleInputTitle(e: HTMLInputElement): void {
  //     if(!e.target) return;

  //     setTaskTitle(e.target.value);
  // }

  async function onSubmit(data: any) {
    //currDayId && taskId ->
    //currDayId !task ->
    //!currDayId !task
    if (!taskId && id !== "") {
        const lastTask = currentDayTasks.at(-1);
        const lastTaskId = lastTask ? lastTask.id : 0
      await updateDoc(doc(db, `${email}/${id}`), {
        tasks: [...currentDayTasks, {...data, id: lastTaskId + 1, completed: false}],
      });
    } else if (!taskId && !id) {
      const docData = {
        day: day,
        month: month,
        year: year,
        tasks: [{...data, id: 0, completed: false}],
      };
      const newDocRef = doc(collection(db, email));
      await setDoc(newDocRef, docData);
      navigate('/')
    }

    reset();
  }

  return isAuth ? (
    <>
      <div>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", {
            required: "Enter title!",
          })}
        />
        <input
          {...register("todo", {
            required: "Enter todo!",
          })}
        />
        <input type="submit" value={mode} />
      </form>
    </>
  ) : (
    <Login />
  );
}

// export async function loader({ params }: any) {

// }
