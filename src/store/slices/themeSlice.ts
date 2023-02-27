import { createSlice } from "@reduxjs/toolkit"

type ThemeType = {
    currentTheme: string,
    light: {
        main: string,
        header: {
            bg: string,
            font: string,
            buttons: string,
            logo: string,
        }
        sidebar: {
            buttons: string
        }
    }
    dark: {
        main: string,
        header: {
            bg: string,
            font: string,
            buttons: string,
            logo: string,
        }
        sidebar: {
            buttons: string
        }
    }
}
const initialState: ThemeType = {
    currentTheme: 'light',
    light: {
        main: '#ffffff',
        header: {
            bg: '#f7f8fa',
            font: '#000000',
            buttons: '#3f5dab',
            logo: '#3f5dab'
        },
        sidebar: {
            buttons: '#3f5dab',
        }
    },
    dark: {
        main: '#121212',
        header: {
            bg: '#1F1B24',
            font: '#f7f8fa',
            buttons: '#BB86FC',
            logo: '#ffffff'
        },
        sidebar: {
            buttons: '#BB86FC',
        }
    }
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.currentTheme = action.payload;
        }
    }
})

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;