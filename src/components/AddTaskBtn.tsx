import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddButton } from "./styles/AddTaskBtnStyles";

export default function AddTaskBtn() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/task");
  }

  return <AddButton onClick={handleClick}>New task</AddButton>;
}
