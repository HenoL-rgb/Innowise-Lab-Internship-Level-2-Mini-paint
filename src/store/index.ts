import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import figureReducer from './slices/figureSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        figure: figureReducer,
        theme: themeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch