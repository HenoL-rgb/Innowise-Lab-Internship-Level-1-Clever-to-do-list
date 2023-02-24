import React, { useState, useEffect, useRef } from "react";
import Day from "./Day";
import { useDays } from "../hooks/useDays";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  calendarDaysType,
  daysListProps,
} from "../types/types";
import { DaysListWrapper } from "./styles/DaysListStyles";

export default function DaysList({
  days,
  currentMonth,
  currentYear,
}: daysListProps) {
  const daysList = useDays(currentMonth, currentYear);
  const dispatch = useAppDispatch();
  const currentDay = useAppSelector((state) => state.currentDay.day);
  const currRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    currRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [currentDay]);

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
          let completed = false;
          let uncompleted = false;
          if (currentTasks) {
            completed = currentTasks.find((task) => task.completed === true)
              ? true
              : false;

            uncompleted = currentTasks.find((task) => task.completed === false)
              ? true
              : false;
          }

          const isCurrent = checkIsCurrent(
            date,
            daysList.find((date) => date.day === currentDay) ?? {
              day: 1,
              month: currentMonth,
              year: currentYear,
              id: "0",
            }
          );
          return (
            <li key={index} ref={date.day === currentDay ? currRef : null}>
              <Day
                completed={completed}
                uncompleted={uncompleted}
                date={date}
                isCurrent={isCurrent}
                onClick={handleClick}
              ></Day>
            </li>
          );
        })}
      </DaysListWrapper>
    </div>
  );
}

function checkIsCurrent(date: calendarDaysType, currentDay: calendarDaysType) {
  return date.day === currentDay.day;
}
