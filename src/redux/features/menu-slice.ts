'use client';
import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        menuItemClick: (state, action) => {
            state.activeMenuItem = action.payload       // in redux action is the argument which we dispatch
        },
        actionItemClick: (state, action) => {
            state.actionMenuItem = action.payload       // state is initial state we maintain we update state from action
        }
    }
})


export const {menuItemClick, actionItemClick}  = menuSlice.actions

export default menuSlice.reducer