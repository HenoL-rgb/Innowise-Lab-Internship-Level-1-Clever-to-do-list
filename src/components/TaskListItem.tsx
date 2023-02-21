import React, { useState } from "react";
import styled from "styled-components";
import { useCurrentDay } from "../hooks/useCurrentDay";
import { useCurrentTask } from "../hooks/useCurrentTask";
import { taskType } from "../hooks/useTasks";

type taskListItemProps = {
  task: taskType;
  handleChange: (task: taskType) => void;
};

const StyledTasksListItem = styled.li`
  display: flex;
  column-gap: 5px;
  font-size: 18px;
  & label {
    display: flex;
    column-gap: 5px;
  }
`;
export default function TaskListItem({ task, handleChange }: taskListItemProps) {
  const [isChecked, setIsChecked] = useState(task.completed);
  

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked((prev) => !prev);
    handleChange({...task, completed: !isChecked})
  }

  return (
    <StyledTasksListItem>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
        ></input>
        {task.title}
      </label>
    </StyledTasksListItem>
  );
}
