import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import { taskType } from "../functions.ts/retrieveDays";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import styled from "styled-components";
import { setCurrentTask } from "../store/slices/currentTaskSlice";

const StyledBackButton = styled.button`
  margin-top: 5px;
  outline: 0;
  display: block;
  padding: 10px 12px;
  font-size: 18px;
  background-color: #d84400;
  color: white;
  border: 0;
  border-radius: 5px;
  width: 20%;
`;

const StyledTaskForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  height: 100%;
  & h3 {
    align-self: flex-start;
    font-weight: 400;
  }
  & input,
  textarea {
    margin-top: 5px;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: block;
    font-size: 16px;
    padding: 10px 12px;
  }

  & textarea {
    height: 100%;
  }

  & input[type="submit"] {
    width: 40%;
    align-self: center;
    font-size: 18px;
    background-color: #fc6722;
    color: white;
    border: 0;
    border-radius: 5px;
  }
  & div {
    display: flex;
    justify-content: space-between;
  }
`;

export default function Task() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { isAuth, email } = useAuth();
  const { day, month, year, id } = useAppSelector((state) => state.currentDay);
  const {taskId, title, todo} = useAppSelector(state => state.currentTask)

  const mode = taskId ? "Update" : "Save";
  const days = useAppSelector(state => state.task.tasks);
  const currentDay = days.find((day) => day.id === id);
  const currentDayTasks: taskType[] = currentDay ? currentDay.tasks : [];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onSubmit(data: any) {
    //currDayId && taskId ->
    //currDayId !task ->
    //!currDayId !task
    if (!taskId && id !== "") {
      updateExistedDoc(data);
    } else if (!taskId && !id) {
      addNewDoc(data);
    } else {
      updateExistedTask(data);
    }
    reset();
    navigate("/");
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
          <input type="submit" value={mode} />
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
  }

  async function updateExistedDoc(data: any) {
    const lastTask = currentDayTasks.at(-1);
    const lastTaskId = lastTask ? lastTask.id : 0;
    await updateDoc(doc(db, `${email}/${id}`), {
      tasks: [
        ...currentDayTasks,
        { ...data, id: lastTaskId + 1, completed: false },
      ],
    });
  }

  async function updateExistedTask(data: any) {
    await updateDoc(doc(db, `${email}/${id}`), {
      tasks: currentDayTasks.map(task => {
        if(task.id === taskId){
          
          return {
            ...task,
            title: data.title,
            todo: data.todo,
          };
        }
        return task;
      })
    });

    dispatch(setCurrentTask({title: '', todo: '', id: 0}))
  }
}

