import React, { useState, useEffect } from "react";
import Day from "./Day";
import styled from "styled-components";
import { useDays } from "../hooks/useDays";
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
    setCurrentMonth(getMonth(daysList[currDay]));
  }, [daysList, currDay]);

  function handleClick(id: number) {
    const dayData = daysList[id];
    setCurrDay(id);
    updateCurrentDay(dayData);
  }

  function updateCurrentDay(dayData: Date) {
    const dayToFind = {
      day: dayData.getDate(),
      month: dayData.getMonth(),
      year: dayData.getFullYear(),
    };
    const dayDb = days.find(
      (t) =>
        t.day === dayToFind.day &&
        t.month === dayToFind.month &&
        t.year === dayToFind.year
    );

    if (dayDb) {
      dispatch(
        setCurrentDay({
          ...dayDb,
        })
      );
    } else {
      dispatch(
        setCurrentDay({
          ...dayToFind,
          id: "",
        })
      );
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{currentMonth}</h1>
      <DaysListWrapper>
        {daysList.map((day, index) => {
          return (
            <li key={index}>
              <Day
                completed={false}
                uncompleted={false}
                day={day}
                id={index}
                isCurrent={checkIsCurrent(day, daysList[currDay])}
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

function checkIsCurrent(day: Date, currentDay: Date) {
  return (
    day.getDay() === currentDay.getDay() &&
    day.getMonth() === currentDay.getMonth() &&
    day.getDate() === currentDay.getDate()
  );
}
