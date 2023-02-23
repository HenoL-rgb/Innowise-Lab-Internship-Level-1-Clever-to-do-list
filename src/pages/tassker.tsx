import React, { Suspense, useEffect, useRef, useState } from "react";
import AddTaskBtn from "../components/AddTaskBtn";
import DaysList from "../components/DaysList";
import Tasks from "../components/Tasks";
import "firebase/firestore";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import SignButton from "../components/SignButton";
import { removeUser } from "../store/slices/userSlice";
import { dayType, retrieveDays, taskType } from "../functions.ts/retrieveDays";
import { Bars } from "react-loader-spinner";
import { setTasks } from "../store/slices/tasksSlice";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { collection, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const TasskerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0 20px;
`;

const LoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: center;
`;
export default function Tassker() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.email);
  const tasks = useAppSelector((state) => state.task.tasks);

  const currentDate = useAppSelector((state) => state.currentDay);
  const realDate = new Date();

  const currM = new Date(currentDate.year, currentDate.month, currentDate.day);
  const currentDateString = currM.toString().split(" ");

  const q = query(
    collection(db, email),
    where("month", "==", currentDate.month),
    where("year", "==", currentDate.year)
  );
  const [test, loading, error, snapshot] = useCollectionData(q);

  useEffect(() => {
    if (!snapshot) return;
    if(snapshot?.docChanges()){
      console.log(test);
      const t: any[] = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      dispatch(setTasks([...t]));
    }
    
  }, [currentDate.month, currentDate.year, test]);

  // useEffect(() => {
  //   console.log('de')
  //   retrieveDays(email, currentDate.month, currentDate.year).then(
  //     res => dispatch(setTasks([...res]))
  //   )
  // }, [email, currentDate.month, currentDate.year])
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
        day:
          newDate.getMonth() === realDate.getMonth() ? realDate.getDate() : 1,
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
      {loading ? (
        <LoaderWrapper>
          <Bars
            height="80"
            width="80"
            color="#fc6722"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </LoaderWrapper>
      ) : (
        <>
          <Tasks days={tasks} />
          <AddTaskBtn />
        </>
      )}
    </TasskerWrapper>
  );
}
