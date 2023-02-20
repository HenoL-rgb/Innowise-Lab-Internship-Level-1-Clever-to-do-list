import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasksSlice";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        task: tasksSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch