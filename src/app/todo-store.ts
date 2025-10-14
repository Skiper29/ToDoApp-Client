import {configureStore} from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

export const todoStore = configureStore({
    reducer: {
        todos: todosReducer,
    },
});

export type RootState = ReturnType<typeof todoStore.getState>;
export type AppDispatch = typeof todoStore.dispatch;