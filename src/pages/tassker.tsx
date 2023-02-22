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
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TasskerWrapper = styled.div`
  position: relative;
  max-width: 762px;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: center;
`;
export default function Tassker() {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();
  const tasks = useAppSelector((state) => state.task.tasks);
  const currentDate = useAppSelector((state) => state.currentDay);
  const currM = new Date(currentDate.year, currentDate.month, currentDate.day);
  const realDate = new Date();
  const currentDateString = currM.toString().split(" ");
  const days = useTasks(email, currentDate.month, currentDate.year);

  useEffect(() => {
    dispatch(addTask([...days]));
    return () => {
      dispatch(clearTasks());
    };
  }, [days]);

  function handleNext() {
    const newDate = new Date(currM.getFullYear(), currM.getMonth() + 1, 1);
    dispatch(
      setCurrentDay({
        ...currentDate,
        day: 1,
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      })
    );
  }

  function handlePrev() {
    const newDate = new Date(
      currentDate.year,
      currentDate.month - 1,
      currentDate.day
    );
    dispatch(
      setCurrentDay({
        ...currentDate,
        day: newDate.getMonth() === realDate.getMonth() ? realDate.getDate() : 1,
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      })
    );
  }

  return (
    <TasskerWrapper>
      <SignButton onClick={() => dispatch(removeUser())} />
      <Header>
        <IconButton
          onClick={handlePrev}
          disabled={
            realDate.getMonth() === currentDate.month &&
            realDate.getFullYear() === currentDate.year
              ? true
              : false
          }
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>

        <h1 style={{ textAlign: "center" }}>
          {`${currentDate.day} ${currentDateString[1]} ${currentDate.year}`}
        </h1>

        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Header>
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
