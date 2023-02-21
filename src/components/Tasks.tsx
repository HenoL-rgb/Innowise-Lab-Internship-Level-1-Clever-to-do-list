import React, { Suspense } from "react";
import { useCurrentTasks } from "../hooks/useCurrentTasks";
import TaskListItem from "./TaskListItem";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";
import { taskType } from "../hooks/useTasks";


const StyledTasksList = styled.ul`
  list-style: none;
`;

const TasksListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
type tasksProps = {
  days: any[];
};

export default function Tasks({ days }: tasksProps) {
  const dayTasks = useCurrentTasks(days);

  function handleChange(task: taskType) {
    console.log('t')
  }
  return (
      <TasksListWrapper>
        <h1>{dayTasks.length} Tasks today</h1>
        <StyledTasksList>
          {dayTasks?.map((task, index) => (
            <li key={task.id}>
              <TaskListItem task={task} handleChange={handleChange}></TaskListItem>
            </li>
          ))}
        </StyledTasksList>
      </TasksListWrapper>
  );
}
