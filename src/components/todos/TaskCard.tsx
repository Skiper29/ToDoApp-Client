import {Box, Card, CardContent, Typography} from '@mui/material';
import {format} from "date-fns";
import {type TodoTaskDto, TodoTaskStatus} from "../../models/todo.ts";
import TaskStatusChip from "../common/TaskStatusChip.tsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface TaskCardProps {
    task: TodoTaskDto;
}

const TaskCard = ({task}: TaskCardProps) => {
    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return null;
        return format(new Date(date), 'MMM dd, yyyy HH:mm');
    };

    const isOverdue =
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== TodoTaskStatus.Done;

    return (
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
                        <TaskStatusChip status={task.status}/>
                    </Box>

                    {task.content && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 6,
                                WebkitBoxOrient: 'vertical',
                                flexShrink: 0,
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
        </Card>
    );
};

export default TaskCard;
