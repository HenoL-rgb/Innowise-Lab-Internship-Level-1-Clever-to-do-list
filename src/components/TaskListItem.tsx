import React, { useState } from "react";
import styled from "styled-components";
import { taskType } from "../functions.ts/retrieveDays";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setCurrentDay } from "../store/slices/currentDaySlice";
import { useAuth } from "../hooks/useAuth";
import { updateTask } from "../store/slices/tasksSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import { setCurrentTask } from "../store/slices/currentTaskSlice";

type taskListItemProps = {
  task: taskType;
  completed: boolean;
  handleChange: (task: taskType) => void;
  handleDelete: (task: taskType) => void;
};

const StyledTasksListItem = styled.li`
  display: flex;
  column-gap: 5px;
  font-size: 22px;
  font-weight: 400;
  position: relative;
  justify-content: space-between;
  align-items: center;
  & label {
    display: flex;
    column-gap: 5px;
    height: 100%;
    align-items: center;
    width: 100%;
  }
  & input {
    border: 1px solid #ff7300;
  }
  & div {
    display: flex;

  }
`;
export default function TaskListItem({
  task,
  completed,
  handleChange,
  handleDelete,
}: taskListItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange({ ...task, completed: !completed });
  }

  function handleDeleteTask() {
    handleDelete(task);
  }

  function handleClick() {
    dispatch(setCurrentTask({
      title: task.title,
      todo: task.todo,
      id: task.id
    }))
    navigate("/task");
  }

  return (
    <StyledTasksListItem>
      <label>
        <Checkbox
          sx={{
            color: "#fdc448",
            "&.Mui-checked": {
              color: "#fc6722",
            },
            "& .MuiSvgIcon-root": { fontSize: 26 },
          }}
          onChange={handleCheck}
          checked={completed}
        />
        <span>{task.title}</span>
      </label>
      <div>
        <IconButton onClick={handleClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </div>
    </StyledTasksListItem>
  );
}
