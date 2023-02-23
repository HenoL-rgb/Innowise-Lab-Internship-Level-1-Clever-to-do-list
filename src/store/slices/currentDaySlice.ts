import { createSlice } from "@reduxjs/toolkit";
import { currDayTypes } from "../../types/types";

const initialState: currDayTypes = {
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  id: '',
  completed: false,
  uncompleted: false,
};

const taskSlice = createSlice({
  name: "currentDay",
  initialState,
  reducers: {
        setCurrentDay(state, action) {
            state.day = action.payload.day;
            state.month = action.payload.month;
            state.year = action.payload.year;
            state.id = action.payload.id;
            state.completed = action.payload.completed;
            state.uncompleted = action.payload.completed;
        }
    },
  },
);


export const { setCurrentDay } = taskSlice.actions;

export default taskSlice.reducer;