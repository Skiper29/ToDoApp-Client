import {Box, Card, CardActions, CardContent, IconButton, Typography} from '@mui/material';
import {format} from "date-fns";
import {type TodoTaskDto, TodoTaskStatus} from "@models/todo.ts";
import TaskStatusChip from "@components/todos/TaskStatusChip/TaskStatusChip.tsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as React from "react";
import {useState} from "react";
import TaskFormDialog from "@components/todos/TaskFormDialog/TaskFormDialog.tsx";
import StatusChangeDialog from "@components/todos/StatusChangeDialog/StatusChangeDialog.tsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteConfirmationDialog from "@components/todos/DeleteConfirmationDialog/DeleteConfirmationDialog.tsx";
import TaskDetailDialog from "@components/todos/TaskDetailDialog/TaskDetailDialog.tsx";

interface TaskCardProps {
    task: TodoTaskDto;
}

const TaskCard = ({task}: TaskCardProps) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);

    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return null;
        return format(new Date(date), 'MMM dd, yyyy HH:mm');
    };

    const isOverdue =
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== TodoTaskStatus.Done;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteDialogOpen(true);
    }

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.MuiIconButton-root') ||
            (e.target as HTMLElement).closest('.MuiChip-root')) {
            return;
        }
        setDetailDialogOpen(true);
    };

    const handleStatusClick = () => {
        setStatusDialogOpen(true);
    }

    return (
        <>
            <Card
                sx={{
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                }}
                onClick={handleCardClick}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        overflow: 'hidden',
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                mb: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    flex: 1,
                                }}
                            >
                                {task.title}
                            </Typography>
                            <TaskStatusChip status={task.status} onClick={handleStatusClick}/>
                        </Box>

                        {task.content && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitMaskImage: 'linear-gradient(180deg, #000 80%, transparent)',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {task.content}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            mt: 'auto',
                            pt: 1,
                            flexShrink: 0,
                        }}
                    >
                        {task.status === TodoTaskStatus.Done && task.finishedAt && (
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5}}>
                                <CheckCircleOutlineIcon sx={{fontSize: 16}} color="success"/>
                                <Typography variant="caption" color="success.main" sx={{fontWeight: 500}}>
                                    Finished: {formatDate(task.finishedAt)}
                                </Typography>
                            </Box>
                        )}

                        {task.deadline && (
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                                <AccessTimeIcon sx={{fontSize: 16}} color={isOverdue ? 'error' : 'action'}/>
                                <Typography variant="caption" color={isOverdue ? 'error.main' : 'text.secondary'}>
                                    {formatDate(task.deadline)}
                                </Typography>
                            </Box>
                        )}
                        <Typography variant="caption" color="text.disabled" sx={{display: 'block', mt: 0.5}}>
                            Created: {formatDate(task.createdAt)}
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions sx={{justifyContent: 'flex-end', px: 2, pb: 2}}>
                    <IconButton
                        size="small"
                        aria-label="edit task"
                        onClick={handleEditClick}
                    >
                        <EditIcon fontSize="small"/>
                    </IconButton>

                    <IconButton
                        size="small"
                        aria-label="delete task"
                        color="error"
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>

                </CardActions>
            </Card>

            <TaskFormDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                task={task}
                mode="edit"
            />

            <StatusChangeDialog
                open={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
                taskId={task.id}
                currentStatus={task.status}/>

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                taskId={task.id}
                taskTitle={task.title}/>

            <TaskDetailDialog
                open={isDetailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                task={task}
                onEdit={() => {
                    setDetailDialogOpen(false);
                    setEditDialogOpen(true);
                }}
                onDelete={() => {
                    setDetailDialogOpen(false);
                    setDeleteDialogOpen(true);
                }}
                onStatusChange={() => {
                    setDetailDialogOpen(false);
                    setStatusDialogOpen(true);
                }}/>

        </>
    );
};

export default TaskCard;
