import { createSlice } from "@reduxjs/toolkit";

type currDayTypes = {
    day: number,
    month: number,
    year: number,
    id: string,
    completed: boolean,
    uncompleted: boolean,
}
const initialState: currDayTypes = {
  day: new Date().getDay(),
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