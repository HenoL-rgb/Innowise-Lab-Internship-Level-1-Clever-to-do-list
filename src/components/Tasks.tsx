import React from "react";
import { useCurrentTasks } from "../hooks/useCurrentTasks";
import TaskListItem from "./TaskListItem";
import styled from "styled-components";

const StyledTasksList = styled.ul`
  list-style: none;
`;

const TasksListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
type tasksProps = {
  days: any[];
};

export default function Tasks({ days }: tasksProps) {
  const dayTasks = useCurrentTasks(days);

  return (
    <TasksListWrapper>
      <h1>{dayTasks.length} Tasks today</h1>
      <StyledTasksList>
        {dayTasks?.map((task, index) => (
          <li key={task.id}>
            <TaskListItem task={task}></TaskListItem>
          </li>
        ))}
      </StyledTasksList>
    </TasksListWrapper>
  );
}
