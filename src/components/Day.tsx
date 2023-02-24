import React from "react";
import { dayProps } from "../types/types";
import { DayWrapper, CompletionList, StyledCircle } from "./styles/DayStyles";

export default function Day({
  completed,
  uncompleted,
  date,
  isCurrent,
  onClick,
}: dayProps) {
  const weekDay: number = new Date(date.year, date.month, date.day).getDay();

  const theme = {
    color: isCurrent ? "white" : (weekDay === 0) ? '#ff5608' :  "black",
    bgColor: isCurrent ? "black" : "white",
    border: (weekDay === 0 && !isCurrent) ? '1px solid #ff5608' : '1px solid rgba(0, 0, 0, 0.1)'
  };

  return (
    <div onClick={() => onClick(date.day)}>
      <DayWrapper theme={theme}>
        <span>{getWeekDay(new Date(date.year, date.month, date.day))}</span>
        <span>{date.day}</span>
      </DayWrapper>
      <CompletionList>
        {completed ? <StyledCircle color="#fc6722"/> : ''}
        {uncompleted ? <StyledCircle color="#fdc448" /> : ''}
      </CompletionList>
    </div>
  );
}

function getWeekDay(day: Date) {
  return day.toString().split(" ")[0];
}
