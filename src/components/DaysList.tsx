import React, { useState, useEffect } from "react";
import Day from "./Day";
import styled from "styled-components";
import { calendarDaysType, useDays } from "../hooks/useDays";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { dayType } from "../hooks/useTasks";

const DaysListWrapper = styled.ul`
  display: flex;
  column-gap: 15px;
  list-style: none;
  overflow-x: scroll;
  max-width: 762px;
  padding: 10px 0 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

type daysListProps = {
  days: dayType[];
};

export default function DaysList({ days }: daysListProps) {
  const [page, setPage] = useState(1);
  const [currDay, setCurrDay] = useState(0);
  const daysList = useDays(page);
  const [currentMonth, setCurrentMonth] = useState("February");
  const dispatch = useAppDispatch();

  useEffect(() => {
    //setCurrentMonth(getMonth(daysList[currDay]));
  }, [daysList, currDay]);

  function handleClick(id: number) {
    const dayData = daysList[id];
    setCurrDay(id);
    updateCurrentDay(dayData);
  }

  function updateCurrentDay(dayData: calendarDaysType) {
    const dayDb = days.find(
      (t) =>
        t.day === dayData.day &&
        t.month === dayData.month &&
        t.year === dayData.year
    );

    if (dayDb) {
      dispatch(
        setCurrentDay({
          ...dayDb,
        })
      );
      return;
    }
    dispatch(
      setCurrentDay({
        ...dayData,
      })
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{currentMonth}</h1>
      <DaysListWrapper>
        {daysList.map((date, index) => {
          let completed = false;
          let uncompleted = false;
          const dayDb = days.find(
            (t) =>
              t.day === date.day &&
              t.month === date.month &&
              t.year === date.year
          );
          if (dayDb) {
            completed = dayDb.tasks.find((task) => task.completed === true)
              ? true
              : false;
            uncompleted = dayDb.tasks.find((task) => task.completed === false)
              ? true
              : false;
          }

          return (
            <li key={index}>
              <Day
                completed={completed}
                uncompleted={uncompleted}
                date={date}
                id={index}
                isCurrent={checkIsCurrent(date, daysList[currDay])}
                onClick={handleClick}
              ></Day>
            </li>
          );
        })}
      </DaysListWrapper>
    </div>
  );
}

function getWeekDay(day: Date) {
  return day.toString().split(" ")[0];
}

function getMonth(day: Date) {
  if (!day) return "";
  return day.toString().split(" ")[1];
}

function checkIsCurrent(date: calendarDaysType, currentDay: calendarDaysType) {
  return (
    date.day === currentDay.day &&
    date.month === currentDay.month &&
    date.year === currentDay.year
  );
}

function checkHaveCompleted(day: dayType) {
  console.log("f");
}
