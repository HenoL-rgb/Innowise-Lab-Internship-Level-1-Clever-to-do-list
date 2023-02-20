import React from 'react'
import Day from './Day'
import styled from 'styled-components'

const DaysListWrapper = styled.ul`
  display: flex;
  column-gap: 15px;
  list-style: none;
`

export default function DaysList() {
  const days = [
    {
      weekDay: "Wed",
      day: 4,
      uncompleted: true,
      completed: true,
      id: 1,
    },
    {
      weekDay: "Wed",
      day: 4,
      uncompleted: true,
      completed: true,
      id: 2,
    },
    {
      weekDay: "Wed",
      day: 4,
      uncompleted: true,
      completed: true,
      id: 3,
    },
    {
      weekDay: "Wed",
      day: 4,
      uncompleted: true,
      completed: true,
      id: 4,
    },
    {
      weekDay: "Wed",
      day: 4,
      uncompleted: true,
      completed: true,
      id: 5,
    },
    {
      weekDay: "Wed",
      day: 4,
      uncompleted: true,
      completed: true,
      id: 6,
    },
  ]
  return (
    <div>
      <DaysListWrapper>
        {days.map(day => {
          return <li key={day.id}><Day {...day}/></li>
        })}
      </DaysListWrapper>
      
    </div>
  )
}
