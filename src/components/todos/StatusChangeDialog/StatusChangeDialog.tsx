import {TodoTaskStatus} from '@models/todo.ts';
import {useAppDispatch} from "@hooks/hooks.ts";
import {useState} from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {updateTodoStatus} from "@features/todos/todosSlice.ts";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface StatusChangeDialogProps {
    open: boolean;
    onClose: () => void;
    taskId: number;
    currentStatus: TodoTaskStatus;
}

const StatusChangeDialog = ({
                                open,
                                onClose,
                                taskId,
                                currentStatus,
                            }: StatusChangeDialogProps) => {
    const dispatch = useAppDispatch();
    const [isUpdating, setIsUpdating] = useState(false);

    const statusOptions = [
        {
            value: TodoTaskStatus.Todo,
            label: 'To Do',
            icon: <RadioButtonUncheckedIcon/>,
        },
        {
            value: TodoTaskStatus.InProgress,
            label: 'In Progress',
            icon: <AccessTimeIcon/>,
        },
        {
            value: TodoTaskStatus.Done,
            label: 'Done',
            icon: <CheckCircleIcon/>,
        },
    ];

    const handleStatusChange = async (newStatus: TodoTaskStatus) => {
        if (newStatus === currentStatus) {
            onClose();
            return;
        }

        setIsUpdating(true);

        try {
            await dispatch(updateTodoStatus({id: taskId, dto: {newStatus}})).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                Change Status
                <IconButton onClick={onClose} disabled={isUpdating} size="small">
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{p: 0}}>
                <List>
                    {statusOptions.map((option) => (
                        <ListItem key={option.value} disablePadding>
                            <ListItemButton
                                onClick={() => handleStatusChange(option.value)}
                                selected={option.value === currentStatus}
                                disabled={isUpdating}
                            >
                                <ListItemIcon>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.label}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>

            <DialogActions sx={{px: 3, py: 2}}>
                <Button onClick={onClose} disabled={isUpdating}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default StatusChangeDialog;