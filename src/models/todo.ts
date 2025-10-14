export enum TodoTaskStatus {
    Todo = 0,
    InProgress = 1,
    Done = 2
}

export interface CreateTodoTaskDto {
    title: string;
    content?: string;
    deadline?: Date;
}

export interface TodoTaskDto {
    id: number;
    title: string;
    content?: string | null;
    status: TodoTaskStatus;
    deadline?: Date | null;
    createdAt: Date;
    finishedAt: Date | null;
}

export interface UpdateTodoTaskDto extends CreateTodoTaskDto {
    id: number;
}

export interface UpdateTaskStatusDto {
    newStatus: TodoTaskStatus;
}