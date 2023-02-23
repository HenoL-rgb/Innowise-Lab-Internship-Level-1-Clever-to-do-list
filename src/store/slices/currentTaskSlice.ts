import { createSlice } from "@reduxjs/toolkit";
import { currTaskTypes } from "../../types/types";


const initialState: currTaskTypes = {
  title: '',
  todo: '',
  taskId: 0,
};

const daysSlice = createSlice({
  name: "currentTask",
  initialState,
  reducers: {
        setCurrentTask(state, action) {
            state.taskId = action.payload.id;
            state.title = action.payload.title;
            state.todo = action.payload.todo;
        }
    },
  },
);


export const { setCurrentTask } = daysSlice.actions;

export default daysSlice.reducer;