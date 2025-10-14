import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TodoApi} from '../../api/todoApi';
import type {CreateTodoTaskDto, TodoTaskDto, UpdateTaskStatusDto, UpdateTodoTaskDto} from '../../models/todo';

interface TodosState {
    tasks: TodoTaskDto[];
    loading: boolean;
    error: string | null;
    selectedTask: TodoTaskDto | null;
}

const initialState: TodosState = {
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null,
};

// Async thunks
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, {rejectWithValue}) => {
        try {
            return await TodoApi.getAll();
        } catch (error) {
            return rejectWithValue((error as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to fetch todos');
        }
    }
);

export const fetchTodoById = createAsyncThunk(
    'todos/fetchTodoById',
    async (id: number, {rejectWithValue}) => {
        try {
            return await TodoApi.getById(id);
        } catch (error) {
            return rejectWithValue((error as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to fetch todo');
        }
    }
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (task: CreateTodoTaskDto, {rejectWithValue}) => {
        try {
            return await TodoApi.create(task);
        } catch (error) {
            return rejectWithValue((error as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to create todo');
        }
    }
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (task: UpdateTodoTaskDto, {rejectWithValue}) => {
        try {
            return await TodoApi.update(task);
        } catch (error) {
            return rejectWithValue((error as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to update todo');
        }
    }
);

export const updateTodoStatus = createAsyncThunk(
    'todos/updateTodoStatus',
    async ({id, dto}: { id: number; dto: UpdateTaskStatusDto }, {rejectWithValue}) => {
        try {
            return await TodoApi.updateStatus(id, dto);
        } catch (error) {
            return rejectWithValue((error as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to update status');
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, {rejectWithValue}) => {
        try {
            await TodoApi.delete(id);
            return id;
        } catch (error) {
            return rejectWithValue((error as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to delete todo');
        }
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all todos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch todo by id
            .addCase(fetchTodoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodoById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTask = action.payload;
            })
            .addCase(fetchTodoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create todo
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.unshift(action.payload);
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update todo
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update status
            .addCase(updateTodoStatus.pending, (state) => {
                state.error = null;
            })
            .addCase(updateTodoStatus.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTodoStatus.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Delete todo
            .addCase(deleteTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {clearError} = todosSlice.actions;
export default todosSlice.reducer;
