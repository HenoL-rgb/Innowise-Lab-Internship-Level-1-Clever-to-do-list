import React from "react";
import styled from "styled-components";
import { calendarDaysType } from "../hooks/useDays";

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  min-width: 90px;
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.bgColor};
  cursor: pointer;
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
  id: number;
  onClick: (id: number) => void;
};

export default function Day({
  completed,
  uncompleted,
  date,
  isCurrent,
  id,
  onClick,
}: dayProps) {
  const theme = {
    color: isCurrent ? "white" : "black",
    bgColor: isCurrent ? "black" : "white",
  };

  return (
    <div onClick={() => onClick(date.day)}>
      <DayWrapper theme={theme}>
        <span>{getWeekDay(new Date(date.day, date.month, date.year))}</span>
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
