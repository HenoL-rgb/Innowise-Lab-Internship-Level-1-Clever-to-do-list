import { createSlice } from "@reduxjs/toolkit";
import { dayType } from "../../functions.ts/retrieveDays";

type tasksTypes = {
  tasks: dayType[];
};
const initialState: tasksTypes = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = [...action.payload];
    },
    removeTask(state, action) {
      state.tasks = state.tasks.map((date) => {
        if (date.day === action.payload.day) {
          return {
            ...date,
            tasks: date.tasks.filter((t) => t.id !== action.payload.id),
          };
        }
        return date;
      });
    },
    updateTask(state, action) {
      state.tasks = state.tasks.map((date) => {
        if (date.day === action.payload.day) {
          const newDate = date;
          newDate.tasks = date.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return { ...task, completed: !task.completed };
            }
            return task;
          });
          return newDate;
        }
        return date;
      });
    },
    clearTasks(state) {
      state.tasks = [];
    },
  },
});

export const { addTask, removeTask, updateTask, clearTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
