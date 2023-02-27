import { createSlice } from "@reduxjs/toolkit"
import { FigureType } from "../../types";

const initialState: FigureType = {
    figure: 'pencil',
    color: '#000000',
    mode: 'outline',
    width: 5,
}

const figureSlice = createSlice({
    name: 'figure',
    initialState,
    reducers: {
        setFigure(state, action) {
            state.figure = action.payload;
        },

        setColor(state, action) {
            state.color = action.payload;
        },

        setMode(state, action) {
            state.mode = action.payload;
        },

        setWidth(state, action) {
            state.width = action.payload;
        }
    }
})

export const { setFigure, setColor, setMode, setWidth } = figureSlice.actions;
export default figureSlice.reducer;