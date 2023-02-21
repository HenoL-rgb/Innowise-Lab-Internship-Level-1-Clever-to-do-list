import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddButton = styled.button`
  min-width: 100%;
  padding: 20px 0;
  background-color: #fc6722;
  color: white;
  border: 0;
  font-size: 18px;
  border-radius: 15px;
  
`;

export default function AddTaskBtn() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/task')
  }

  return <AddButton onClick={handleClick}>New task</AddButton>;
}
