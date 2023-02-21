import React, { Suspense, useEffect, useState } from "react";
import AddTaskBtn from "../components/AddTaskBtn";
import DaysList from "../components/DaysList";
import Tasks from "../components/Tasks";
import "firebase/firestore";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useAuth } from "../hooks/useAuth";
import SignButton from "../components/SignButton";
import { removeUser } from "../store/slices/userSlice";
import { taskType, useTasks } from "../hooks/useTasks";
import Login from "./Login";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { addTask, clearTasks, removeTask } from "../store/slices/tasksSlice";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const TasskerWrapper = styled.div`
  position: relative;
  max-width: 762px;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0 20px;
`;
export default function Tassker() {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();
  const tasks = useAppSelector((state) => state.task.tasks);
  const currentDate = useAppSelector((state) => state.currentDay);
  const currM = new Date(currentDate.year, currentDate.month, currentDate.day);

  const days = useTasks(email, currentDate.month, currentDate.year);

  useEffect(() => {
    dispatch(addTask([...days]));
    return () => {
      dispatch(clearTasks());
    };
  }, [days]);

  function handleClick() {
    const newDate = new Date(
      currentDate.year,
      currentDate.month + 1,
      currentDate.day
    );
    dispatch(setCurrentDay({ ...currentDate, month: newDate.getMonth() }));
  }

  return (
    <TasskerWrapper>
      <SignButton onClick={() => dispatch(removeUser())} />
      <IconButton onClick={handleClick}> 
        <NavigateNextIcon />
      </IconButton>
      <h1 style={{ textAlign: "center" }}>{currM.toString().split(" ")[1]}</h1>
      <DaysList
        days={tasks}
        currentMonth={currentDate.month}
        currentYear={currentDate.year}
      />
      <Tasks days={tasks} />
      <AddTaskBtn />
    </TasskerWrapper>
  );
}
