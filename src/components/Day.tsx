import React from "react";
import styled from "styled-components";
import { calendarDaysType } from "../hooks/useDays";

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 30px;
  border: ${(props => props.theme.border)};
  border-radius: 15px;
  min-width: 95px;
  font-size: 18px;
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.bgColor};
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }
`;

const StyledCircle = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

const CompletionList = styled.div`
  padding-top: 5px;
  display: flex;
  column-gap: 5px;
  height: 10px;
  justify-content: center;
`

type dayProps = {
  completed: boolean;
  uncompleted: boolean;
  date: calendarDaysType;
  isCurrent: boolean;
  onClick: (day: number) => void;
};

export default function Day({
  completed,
  uncompleted,
  date,
  isCurrent,
  onClick,
}: dayProps) {
  const weekDay = new Date(date.year, date.month, date.day).getDay();

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
