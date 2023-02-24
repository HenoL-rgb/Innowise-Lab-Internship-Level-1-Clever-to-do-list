import React from "react";
import { themeSettings } from "../themeSetting";
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
    color: isCurrent
      ? themeSettings.day.current.color
      : weekDay === 0
      ? themeSettings.day.weekDay.color
      : themeSettings.day.default.color,

    bgColor: isCurrent
      ? themeSettings.day.current.bg
      : themeSettings.day.default.bg,

    border:
      weekDay === 0 && !isCurrent
        ? themeSettings.day.weekDay.border
        : themeSettings.day.default.border,
  };

  return (
    <div onClick={() => onClick(date.day)}>
      <DayWrapper theme={theme}>
        <span>{getWeekDay(new Date(date.year, date.month, date.day))}</span>
        <span>{date.day}</span>
      </DayWrapper>
      <CompletionList>
        {completed ? <StyledCircle color="#fc6722" /> : ""}
        {uncompleted ? <StyledCircle color="#fdc448" /> : ""}
      </CompletionList>
    </div>
  );
}

function getWeekDay(day: Date) {
  return day.toString().split(" ")[0];
}
