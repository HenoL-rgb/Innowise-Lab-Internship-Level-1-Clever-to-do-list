import React, { useState } from "react";
import styled from "styled-components";
import { useCurrentDay } from "../hooks/useCurrentDay";
import { useCurrentTask } from "../hooks/useCurrentTask";
import { taskType } from "../hooks/useTasks";
import Checkbox from "@mui/material/Checkbox";

type taskListItemProps = {
  task: taskType;
  handleChange: (task: taskType) => void;
};

const StyledTasksListItem = styled.li`
  display: flex;
  column-gap: 5px;
  font-size: 22px;
  font-weight: 400;
  position: relative;
  & label {
    display: flex;
    column-gap: 5px;
    height: 100%;
    align-items: center;
  }
  & input {
    border: 1px solid #ff7300;
  }
`;
export default function TaskListItem({
  task,
  handleChange,
}: taskListItemProps) {
  const [isChecked, setIsChecked] = useState(task.completed);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked((prev) => !prev);
    handleChange({ ...task, completed: !isChecked });
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
          checked={isChecked}
          onChange={handleCheck}
        />
        <span>{task.title}</span>
      </label>
    </StyledTasksListItem>
  );
}
