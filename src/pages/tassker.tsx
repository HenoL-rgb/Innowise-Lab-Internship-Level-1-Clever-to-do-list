import React from 'react'
import AddTaskBtn from '../components/AddTaskBtn'
import DaysList from '../components/DaysList'
import Tasks from '../components/Tasks'
import 'firebase/firestore'

export default function Tassker() {
  
  return (
    <>
        <DaysList />
        <Tasks />
        <AddTaskBtn />
    </>
  )
}
