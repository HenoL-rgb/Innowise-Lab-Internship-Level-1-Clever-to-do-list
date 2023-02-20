import React from 'react'
import AddTaskBtn from '../components/AddTaskBtn'
import DaysList from '../components/DaysList'
import Tasks from '../components/Tasks'
import 'firebase/firestore'
import styled from 'styled-components'
import { db } from '../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'

const TasskerWrapper = styled.div`
  position: relative;
  max-width: 762px;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  justify-content: space-between;
  
`
export default function Tassker() {
  async function getTasks(){
    const docf = await getDoc(doc(db, "tasks"))
  }
  return (
    <TasskerWrapper>
        <DaysList />
        <Tasks />
        <AddTaskBtn />
    </TasskerWrapper>
  )
}
