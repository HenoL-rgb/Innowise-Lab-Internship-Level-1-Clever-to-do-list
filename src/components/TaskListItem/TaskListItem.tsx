import React from "react";
import { taskListItemProps } from "../../types/types";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import { setCurrentTask } from "../../store/slices/currentTaskSlice";
import { StyledTasksListItem } from "./TaskListItemStyles";
import { themeSettings } from "../../themeSetting";

const theme = {
  completed: { ...themeSettings.task.completed },
  uncompleted: { ...themeSettings.task.uncompleted },
};

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
    dispatch(
      setCurrentTask({
        title: task.title,
        todo: task.todo,
        id: task.id,
      })
    );
    navigate("/task");
  }

  return (
    <StyledTasksListItem
      theme={completed ? theme.completed : theme.uncompleted}
    >
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
        <IconButton onClick={handleClick} disabled={completed}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </div>
    </StyledTasksListItem>
  );
}
