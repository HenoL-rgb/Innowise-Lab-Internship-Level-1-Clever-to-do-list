import React, { useState, useEffect } from "react";
import Day from "./Day";
import styled from "styled-components";
import { useDays } from "../hooks/useDays";

const DaysListWrapper = styled.ul`
  display: flex;
  column-gap: 15px;
  list-style: none;
  overflow-x: scroll;
  max-width: 762px;
  padding-left: 20px;
  padding-top: 10px;
`;

export default function DaysList() {
  const [page, setPage] = useState(1);
  const [currentDay, setCurrentDay] = useState(0);
  const daysList = useDays(page);
  const [currentMonth, setCurrentMonth] = useState('February');

  useEffect(() => {
    setCurrentMonth(getMonth(daysList[currentDay]))
  }, [daysList, currentDay])

  function handleClick(id: number) {
    setCurrentDay(id)
  }
 
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{currentMonth}</h1>
      <DaysListWrapper>
        {daysList.map((day, index) => {
          return (
            <li key={index}>
              <Day
                completed={false}
                uncompleted={false}
                weekDay={getWeekDay(day)}
                day={day.getDate()}
                id={index}
                isCurrent={index === currentDay}
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
  return day.toString().split(' ')[0]
}

function getMonth(day: Date) {
  if(!day) return ''
  return day.toString().split(' ')[1]
}


function isCurrent(day: Date, currentDay: Date) {
  return day.getDay() === currentDay.getDay() && day.getMonth() === currentDay.getMonth()
  && day.getDate() === currentDay.getDate();
}