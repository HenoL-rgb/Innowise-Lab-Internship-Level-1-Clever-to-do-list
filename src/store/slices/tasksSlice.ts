import { createSlice } from "@reduxjs/toolkit";

type tasksTypes = {
  tasks: any[];
};
const initialState: tasksTypes = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = [...action.payload.tasks];
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }

        return task;
      });
    },
  },
});


export const { addTask, removeTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;