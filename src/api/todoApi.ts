import {type AxiosInstance} from "axios";
import type {CreateTodoTaskDto, TodoTaskDto, UpdateTaskStatusDto, UpdateTodoTaskDto} from "../models/todo";
import {API_ROUTES} from "../constants/api-routes.constants.ts";

export const TodoApi = {
    // GET /api/TodoTask
    async getAll(client: AxiosInstance): Promise<TodoTaskDto[]> {
        const response = await client.get<TodoTaskDto[]>(`${API_ROUTES.TODO_TASK.BASE}`);
        return response.data;
    },

    // GET /api/TodoTask/{id}
    async getById(client: AxiosInstance, id: number): Promise<TodoTaskDto> {
        const response = await client.get<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}/${id}`);
        return response.data;
    },

    // POST /api/TodoTask
    async create(client: AxiosInstance, task: CreateTodoTaskDto): Promise<TodoTaskDto> {
        const response = await client.post<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}`, task);
        return response.data;
    },

    // PUT /api/TodoTask
    async update(client: AxiosInstance, task: UpdateTodoTaskDto): Promise<TodoTaskDto> {
        const response = await client.put<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}`, task);
        return response.data;
    },

    // PATCH /api/TodoTask/{id}
    async updateStatus(client: AxiosInstance, id: number, dto: UpdateTaskStatusDto): Promise<TodoTaskDto> {
        const response = await client.patch<TodoTaskDto>(`${API_ROUTES.TODO_TASK.BASE}/${id}`, dto);
        return response.data;
    },

    // DELETE /api/TodoTask/{id}
    async delete(client: AxiosInstance, id: number): Promise<void> {
        await client.delete(`${API_ROUTES.TODO_TASK.BASE}${id}`);
    }
};