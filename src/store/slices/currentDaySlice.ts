import { createSlice } from "@reduxjs/toolkit";

type currDayTypes = {
    day: number,
    month: number,
    weekDay: number,
    year: number,
}
const initialState: currDayTypes = {
  day: 0,
  month: 0,
  weekDay: 0,
  year: 0,
};

const tasksSlice = createSlice({
  name: "currentDay",
  initialState,
  reducers: {
        setCurrentDay(state, action) {
            state.day = action.payload.day;
            state.month = action.payload.month;
            state.weekDay = action.payload.weekDay;
            state.year = action.payload.year;
        }
    },
  },
);


export const { setCurrentDay } = tasksSlice.actions;

export default tasksSlice.reducer;