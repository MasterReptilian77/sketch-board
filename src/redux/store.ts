import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from '@/redux/features/menu-slice';
import ToolboxReducer from '@/redux/features/toolbox-slice';

export const store = configureStore({
    reducer: {
        menu: MenuReducer,
        toolbox: ToolboxReducer
    }
})