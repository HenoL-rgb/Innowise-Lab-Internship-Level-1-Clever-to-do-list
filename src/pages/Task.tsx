import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { currDayTypes, currTaskTypes, dayType, taskType } from "../types/types";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setCurrentTask } from "../store/slices/currentTaskSlice";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { Bars } from "react-loader-spinner";
import { StyledTaskForm, StyledBackButton, ErrorStyle } from "./styles/TaskStyles";
import { themeSettings } from "../themeSetting";


export default function Task() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const email: string = useAppSelector((state) => state.user.email);
  const { day, month, year, id }: currDayTypes = useAppSelector((state) => state.currentDay);
  const { taskId, title, todo }: currTaskTypes = useAppSelector((state) => state.currentTask);
  const [loading, setLoading] = useState(false);

  const mode = taskId ? "Update" : "Save";
  const days: dayType[] = useAppSelector((state) => state.task.tasks);
  const currentDay = days.find((day) => day.id === id);
  const currentDayTasks: taskType[] = currentDay ? currentDay.tasks : [];

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
    reset();
    updateTasks(data).then(() => {
      navigate("/");
      setLoading(false);
    });
  }

  function handleBack() {
    reset();
    dispatch(setCurrentTask({title: '', todo: '', id: 0}));
    navigate('/')
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
        {errors?.title && <ErrorStyle>{errors.title.message?.toString() || "Error!"}</ErrorStyle>}
        <h3>Description: </h3>
        <textarea
          {...register("todo")}
          defaultValue={todo}
        />
        <div>
          <StyledBackButton onClick={handleBack}>
            Back
          </StyledBackButton>
          {loading ? (
            <Bars
              height="80"
              width="80"
              color={themeSettings.buttons.default}
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
    const maxTaskId = currentDayTasks ? currentDayTasks.reduce((maxId, item) => {
      if(item.id > maxId){
        return item.id;
      }
      return maxId;
    },1) : 1;
    await updateDoc(doc(db, `${email}/${id}`), {
      tasks: [
        ...currentDayTasks,
        { ...data, id: maxTaskId + 1, completed: false },
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
