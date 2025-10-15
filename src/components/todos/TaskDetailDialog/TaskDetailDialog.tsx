import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {type TodoTaskDto, TodoTaskStatus} from "@models/todo.ts";
import {format} from "date-fns";
import TaskStatusChip from "@components/todos/TaskStatusChip/TaskStatusChip.tsx";

interface TaskDetailDialogProps {
    open: boolean;
    onClose: () => void;
    task: TodoTaskDto | null;
    onEdit: () => void;
    onDelete: () => void;
    onStatusChange: () => void;
}

const TaskDetailDialog = ({
                              open,
                              onClose,
                              task,
                              onEdit,
                              onDelete,
                              onStatusChange,
                          }: TaskDetailDialogProps) => {
    if (!task) return null;

    const formatDate = (date: Date | null | undefined) => {
        if (!date) return 'Not set';
        return format(new Date(date), 'MMMM dd, yyyy HH:mm');
    };

    const isOverdue =
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== TodoTaskStatus.Done;

    return (<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                pb: 2,
            }}
        >
            <Box sx={{flex: 1, pr: 2}}>
                <Typography variant="h5" component="div" sx={{mb: 1, fontWeight: 600}}>
                    {task.title}
                </Typography>
                <Box onClick={onStatusChange} sx={{cursor: 'pointer', display: 'inline-block'}}>
                    <TaskStatusChip status={task.status}/>
                </Box>
            </Box>
            <IconButton onClick={onClose} size="small">
                <CloseIcon/>
            </IconButton>
        </DialogTitle>

        <DialogContent dividers>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                {/* Description */}
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{mb: 1}}>
                        Description
                    </Typography>
                    <Typography variant="body1">
                        {task.content || (
                            <span style={{fontStyle: 'italic', color: 'gray'}}>
                  No description provided
                </span>
                        )}
                    </Typography>
                </Box>

                <Divider/>

                {/* Deadline */}
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{mb: 1}}>
                        Deadline
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <AccessTimeIcon
                            fontSize="small"
                            color={isOverdue ? 'error' : 'action'}
                        />
                        <Typography color={isOverdue ? 'error.main' : 'text.primary'}>
                            {formatDate(task.deadline)}
                        </Typography>
                        {isOverdue && (
                            <Chip label="Overdue" color="error" size="small" sx={{ml: 1}}/>
                        )}
                    </Box>
                </Box>

                <Divider/>

                {/* Created At */}
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{mb: 1}}>
                        Created
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <CalendarTodayIcon fontSize="small" color="action"/>
                        <Typography>{formatDate(task.createdAt)}</Typography>
                    </Box>
                </Box>

                {/* Finished At */}
                {task.finishedAt && (
                    <>
                        <Divider/>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{mb: 1}}>
                                Completed
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <CheckCircleOutlineIcon fontSize="small" color="success"/>
                                <Typography>{formatDate(task.finishedAt)}</Typography>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </DialogContent>

        <DialogActions sx={{px: 3, py: 2, justifyContent: 'space-between'}}>
            <Box>
                <IconButton
                    onClick={onDelete}
                    color="error"
                    aria-label="delete task"
                    sx={{mr: 1}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
            <Box>
                <Button onClick={onClose} sx={{mr: 1}}>
                    Close
                </Button>
                <Button onClick={onEdit} variant="contained" startIcon={<EditIcon/>}>
                    Edit
                </Button>
            </Box>
        </DialogActions>
    </Dialog>);
}

export default TaskDetailDialog;