import { createSlice } from "@reduxjs/toolkit";

type currDayTypes = {
    day: number,
    month: number,
    year: number,
    id: string,
}
const initialState: currDayTypes = {
  day: 0,
  month: 0,
  year: 0,
  id: '',
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
        }
    },
  },
);


export const { setCurrentDay } = taskSlice.actions;

export default taskSlice.reducer;