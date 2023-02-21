import { createSlice } from "@reduxjs/toolkit";
import { dayType } from "../../hooks/useTasks";

type tasksTypes = {
  tasks: dayType[],
};
const initialState: tasksTypes = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
        console.log(action.payload)
      state.tasks = [...state.tasks, ...action.payload];
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.task.id) {
          return action.payload.task;
        }

        return task;
      });
    },
    clearTasks(state) {
        state.tasks = [];
    }
  },
});


export const { addTask, removeTask, updateTask, clearTasks } = tasksSlice.actions;

export default tasksSlice.reducer;