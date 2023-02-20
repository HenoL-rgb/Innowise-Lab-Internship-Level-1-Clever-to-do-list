import React from "react";
import styled from 'styled-components'

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 30px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 15px;
  color: ${props => props.color};
`



type dayProps = {
  completed: boolean,
  uncompleted: boolean,
  day: Date,
  isCurrent: boolean,
  id: number,
  onClick: (id: number) => void,
};

export default function Day({
  completed,
  uncompleted,
  day,
  isCurrent,
  id,
  onClick
}: dayProps) {


  return (
    <div onClick={() => onClick(id)}>
      <DayWrapper color={isCurrent ? 'red' : 'black'}>
        <span>{getWeekDay(day)}</span>
        <span>{day.getDate()}</span>
      </DayWrapper>
      <div>
        <span>{completed}</span>
        <span>{uncompleted}</span>
      </div>
    </div>
  );
}

function getWeekDay(day: Date) {
  return day.toString().split(' ')[0]
}
