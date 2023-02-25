import React, { useEffect, useRef } from "react";
import AddTaskBtn from "../../components/AddTaskBtn/AddTaskBtn";
import DaysList from "../../components/DayList/DaysList";
import Tasks from "../../components/Tasks/Tasks";
import "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import SignButton from "../../components/SignButton/SignButton";
import { removeUser } from "../../store/slices/userSlice";
import { currDayTypes, dayType } from "../../types/types";
import { Bars } from "react-loader-spinner";
import { setTasks } from "../../store/slices/tasksSlice";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { setCurrentDay } from "../../store/slices/currentDaySlice";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import {
  TasskerWrapper,
  Header,
  LoaderWrapper,
  CalendarInput,
} from "./TasskerStyles";

export default function Tassker() {
  const dispatch = useAppDispatch();
  const email: string = useAppSelector((state) => state.user.email);
  const days: dayType[] = useAppSelector((state) => state.task.tasks);

  const currentDate: currDayTypes = useAppSelector((state) => state.currentDay);
  const realDate: Date = new Date();
  const realDateString: string[] = realDate.toLocaleDateString().split(".");

  const currM = new Date(currentDate.year, currentDate.month, currentDate.day);
  const currentDateString: string[] = currM.toString().split(" ");
  const currentDateLocalString: string[] = currM.toLocaleDateString().split(".");

  const q = query(
    collection(db, email),
    where("month", "==", currentDate.month),
    where("year", "==", currentDate.year)
  );

  const [test, loading, error, snapshot] = useCollectionData(q);

  useEffect(() => {
    if (!snapshot) return;
    if (snapshot?.docChanges()) {
      const t: any[] = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      dispatch(setTasks([...t]));
      dispatch(
        setCurrentDay({
          day: currentDate.day,
          month: currentDate.month,
          year: currentDate.year,
          id: t.find((date) => date.day === currentDate.day)?.id ?? "",
        })
      );
    }
  }, [currentDate.month, currentDate.year, test]);

  function handleNext() {
    const newDate = new Date(currM.getFullYear(), currM.getMonth() + 1, 1);

    dispatch(
      setCurrentDay({
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

  function handleCalendarClick() {
    if (!calRef.current) return;
    calRef.current?.focus();
  }

  function handleCalendarChange(e: any) {
    const newDate = e.target.value.split("-");
    if(!newDate.toString()) return;
    dispatch(
      setCurrentDay({
        day: +newDate[2],
        month: +newDate[1] - 1,
        year: +newDate[0],
        id: days.find((date) => date.day === +newDate[2])?.id ?? "",
      })
    );
  }

  function handleLogout() {
    dispatch(removeUser())
    localStorage.removeItem('userInfo')
  }

  const calRef = useRef<HTMLInputElement>(null);
  return (
    <TasskerWrapper>
      <SignButton onClick={handleLogout} />
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

        <h1 style={{ textAlign: "center" }} onClick={handleCalendarClick}>
          {`${currentDate.day} ${currentDateString[1]} ${currentDate.year}`}
          <CalendarInput
            ref={calRef}
            type="date"
            onFocus={(e) => e.target.showPicker()}
            onChange={handleCalendarChange}
            min={`${realDateString[2]}-${realDateString[1]}-${realDateString[0]}`}
            value={`${currentDateLocalString[2]}-${currentDateLocalString[1]}-${currentDateLocalString[0]}`}
          />
        </h1>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Header>
      <DaysList
        days={days}
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
          <Tasks days={days} />
          <AddTaskBtn />
        </>
      )}
    </TasskerWrapper>
  );
}
