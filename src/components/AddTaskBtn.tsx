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
  border-radius: 5px;
  padding: 10px 12px;
`;

export default function AddTaskBtn() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/task");
  }

  return <AddButton onClick={handleClick}>New task</AddButton>;
}
