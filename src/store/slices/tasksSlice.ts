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
    setTasks(state, action) {
      state.tasks = [...action.payload];
    },
  },
});

export const { setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
