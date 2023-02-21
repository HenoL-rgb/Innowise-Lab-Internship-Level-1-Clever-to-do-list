import React, { useState } from "react";
import styled from "styled-components";
import { taskType } from "../hooks/useTasks";

type taskListItemProps = {
  task: taskType;
};

const StyledTasksListItem = styled.label`
  display: flex;
  column-gap: 5px;
  font-size: 18px;
`;
export default function TaskListItem({ task }: taskListItemProps) {
  const [isChecked, setIsChecked] = useState(task.completed);

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setIsChecked((prev) => !prev);
  }

  return (
    <StyledTasksListItem>
      <input type="checkbox" checked={isChecked} onChange={handleClick}></input>
      {task.title}
    </StyledTasksListItem>
  );
}
