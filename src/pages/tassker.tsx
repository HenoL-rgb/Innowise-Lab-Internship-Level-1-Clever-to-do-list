import React, { useEffect, useState } from "react";
import AddTaskBtn from "../components/AddTaskBtn";
import DaysList from "../components/DaysList";
import Tasks from "../components/Tasks";
import "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useAuth } from "../hooks/useAuth";
import SignButton from "../components/SignButton";
import { removeUser } from "../store/slices/userSlice";
import { useTasks } from "../hooks/useTasks";
import Login from "./Login";

const TasskerWrapper = styled.div`
  position: relative;
  width: 762px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  justify-content: space-between;
  padding: 20px;
`;
export default function Tassker() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, email } = useAuth();
  
  const tasks = useTasks(email)

  console.log(tasks)


  return isAuth ? (
    <TasskerWrapper>
      <SignButton onClick={() => dispatch(removeUser())} />
      <DaysList days={tasks}/>
      <Tasks tasks={tasks} />
      <AddTaskBtn />
    </TasskerWrapper>
  ) : (
    <Login />
  );
}
