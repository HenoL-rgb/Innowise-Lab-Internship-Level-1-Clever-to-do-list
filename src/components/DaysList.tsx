import React, { useState, useEffect } from "react";
import Day from "./Day";
import styled from "styled-components";
import { calendarDaysType, useDays } from "../hooks/useDays";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { dayType, taskType } from "../functions.ts/retrieveDays";

const DaysListWrapper = styled.ul`
  display: flex;
  column-gap: 15px;
  list-style: none;
  overflow-x: scroll;
  padding: 10px 0 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

type daysListProps = {
  days: dayType[];
  currentMonth: number;
  currentYear: number;
};

export default function DaysList({
  days,
  currentMonth,
  currentYear,
}: daysListProps) {
  const daysList = useDays(currentMonth, currentYear);
  const dispatch = useAppDispatch();
  const currentDay = useAppSelector((state) => state.currentDay.day);
  useEffect(() => {
    updateCurrentDay(currentDay);
  }, [days]);

  function handleClick(day: number) {
    updateCurrentDay(day);
  }

  function updateCurrentDay(day: number) {
    const dayDb = days.find((t) => t.day === day);

    if (dayDb) {
      dispatch(
        setCurrentDay({
          ...dayDb,
          day: day,
        })
      );
      return;
    }

    dispatch(
      setCurrentDay({
        day: day,
        month: currentMonth,
        year: currentYear,
        id: "",
      })
    );
  }

  return (
    <div>
      <DaysListWrapper>
        {daysList.map((date, index) => {
          const currentTasks = days.find((d) => d.day === date.day)?.tasks;
          const completed = currentTasks
            ? currentTasks.find((task) => task.completed === true)
              ? true
              : false
            : false;
            const uncompleted = currentTasks
            ? currentTasks.find((task) => task.completed === false)
              ? true
              : false
            : false;
          return (
            <li key={index}>
              <Day
                completed={completed}
                uncompleted={uncompleted}
                date={date}
                id={index}
                isCurrent={checkIsCurrent(
                  date,
                  daysList.find((date) => date.day === currentDay) ?? {
                    day: 1,
                    month: currentMonth,
                    year: currentYear,
                    id: "0",
                  }
                )}
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
  return date.day === currentDay.day;
}

function checkHaveCompleted(day: dayType) {
  console.log("f");
}
