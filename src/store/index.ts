import { configureStore } from "@reduxjs/toolkit";
import currentDaySlice from "./slices/currentDaySlice";
import currentTaskSlice from "./slices/currentTaskSlice";
import tasksSlice from "./slices/tasksSlice";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        task: tasksSlice,
        currentDay: currentDaySlice,
        currentTask: currentTaskSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch