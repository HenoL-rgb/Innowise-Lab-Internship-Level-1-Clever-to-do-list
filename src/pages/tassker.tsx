import React, { Suspense, useEffect, useState } from "react";
import AddTaskBtn from "../components/AddTaskBtn";
import DaysList from "../components/DaysList";
import Tasks from "../components/Tasks";
import "firebase/firestore";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useAuth } from "../hooks/useAuth";
import SignButton from "../components/SignButton";
import { removeUser } from "../store/slices/userSlice";
import { useTasks } from "../hooks/useTasks";
import Login from "./Login";

const TasskerWrapper = styled.div`
  position: relative;
  max-width: 762px;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0 20px;
  
`;
export default function Tassker() {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();
  const days = useTasks(email);
  
  return  (
    <TasskerWrapper>
      <SignButton onClick={() => dispatch(removeUser())} />
      <DaysList days={days} />
      <Tasks days={days} />
      <AddTaskBtn />
    </TasskerWrapper>
  );
}
