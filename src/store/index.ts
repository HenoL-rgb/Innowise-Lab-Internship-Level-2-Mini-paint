import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import figureReducer from './slices/figureSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        figure: figureReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch