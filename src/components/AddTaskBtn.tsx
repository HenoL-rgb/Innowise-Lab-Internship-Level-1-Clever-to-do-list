import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddButton = styled.button`
  width: 60%;
  align-self: center;
  font-size: 18px;
  background-color: #fc6722;
  color: white;
  border: 0;
  justify-self: flex-end;
  border-radius: 5px;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: #ff5608;
  }
  &:active {
    background-color: #ff7b3e;
  }
`;

export default function AddTaskBtn() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/task");
  }

  return <AddButton onClick={handleClick}>New task</AddButton>;
}
