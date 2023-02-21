import { createSlice } from "@reduxjs/toolkit";

type currDayTypes = {
    taskId: string,
    title: string,
    todo: string,
}
const initialState: currDayTypes = {
  title: '',
  todo: '',
  taskId: '',
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