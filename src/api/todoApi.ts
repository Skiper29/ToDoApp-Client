import {axiosInstance} from "./axios.ts";
import type {CreateTodoTaskDto, TodoTaskDto, UpdateTaskStatusDto, UpdateTodoTaskDto} from "../models/todo";
import {API_ROUTES} from "../constants/api-routes.constants.ts";

export const TodoApi = {
    // GET /api/TodoTask
    async getAll(): Promise<TodoTaskDto[]> {
        const response = await axiosInstance.get<TodoTaskDto[]>(`${API_ROUTES.TODO_TASK.BASE}`);
        return response.data;
    },

    // GET /api/TodoTask/{id}
    async getById(id: number): Promise<TodoTaskDto> {
        const response = await axiosInstance.get<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}/${id}`);
        return response.data;
    },

    // POST /api/TodoTask
    async create(task: CreateTodoTaskDto): Promise<TodoTaskDto> {
        const response = await axiosInstance.post<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}`, task);
        return response.data;
    },

    // PUT /api/TodoTask
    async update(task: UpdateTodoTaskDto): Promise<TodoTaskDto> {
        const response = await axiosInstance.put<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}`, task);
        return response.data;
    },

    // PATCH /api/TodoTask/{id}
    async updateStatus(id: number, dto: UpdateTaskStatusDto): Promise<TodoTaskDto> {
        const response = await axiosInstance.patch<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}/${id}`, dto);
        return response.data;
    },

    // DELETE /api/TodoTask/{id}
    async delete(id: number): Promise<void> {
        await axiosInstance.delete(`${API_ROUTES.TODO_TASK.BASE}/${id}`);
    }
};