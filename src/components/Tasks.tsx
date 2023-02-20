import React from "react";
import { useCurrentDay } from "../hooks/useCurrentDay";

type tasksProps = {
  tasks: any[];
};
export default function Tasks({ tasks }: tasksProps) {
  const dayTasks = useCurrentDay(tasks);

  console.log(dayTasks);
  return (
    <div>
      {dayTasks?.map((task, index) => (
        <div key={index}>
          <span>{task.title}</span>
          <span>{task.todo}</span>
        </div>
      ))}
    </div>
  );
}
