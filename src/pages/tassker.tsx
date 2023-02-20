import React, { useEffect } from 'react'
import AddTaskBtn from '../components/AddTaskBtn'
import DaysList from '../components/DaysList'
import Tasks from '../components/Tasks'
import 'firebase/firestore'
import styled from 'styled-components'
import { db } from '../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux-hooks'
import { useAuth } from '../hooks/useAuth'
import SignButton from '../components/SignButton'
import { removeUser } from '../store/slices/userSlice'

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {isAuth, email} = useAuth();

  useEffect(() => {
    if(!isAuth) {
      navigate('/login')
    }
    
  }, [isAuth])
  
  
  async function getTasks(){
    const docf = await getDoc(doc(db, "tasks"))
  }
  return  (
    <TasskerWrapper>
      <SignButton onClick={() => dispatch(removeUser())} />
        <DaysList />
        <Tasks />
        <AddTaskBtn />
    </TasskerWrapper>
  )
}


