'use client';

import { COLORS, MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {}
}

export const toolboxSlice = createSlice({
    name: 'toolbox',
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color
        },
        changeBrushWidth: (state, action) => {
            state[action.payload.item].size = action.payload.size
        }
    }
})


export const {changeColor, changeBrushWidth}  = toolboxSlice.actions

export default toolboxSlice.reducer