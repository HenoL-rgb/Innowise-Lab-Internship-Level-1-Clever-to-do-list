import { createSlice } from "@reduxjs/toolkit";
import { dayType, tasksTypes } from "../../types/types";


const initialState: tasksTypes = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = [...action.payload];
    },
  },
});

export const { setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
