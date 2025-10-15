import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import type {TodoTaskDto} from "@models/todo.ts";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskCard from "@components/todos/TaskCard/TaskCard.tsx";

interface TaskListProps {
    tasks: TodoTaskDto[];
    loading: boolean;
}

const TaskList = ({tasks, loading}: TaskListProps) => {
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 300,
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (tasks.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 300,
                    color: 'text.secondary',
                }}
            >
                <AssignmentIcon sx={{fontSize: 64, mb: 2, opacity: 0.5}}/>
                <Typography variant="h6" color="text.secondary">
                    No tasks found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                    Create a new task to get started
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {tasks.map((task) => (
                <Grid key={task.id} size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                    <TaskCard task={task}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default TaskList;