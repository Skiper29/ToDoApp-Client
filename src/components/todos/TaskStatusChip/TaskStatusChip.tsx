import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {TodoTaskStatus} from "@models/todo.ts";
import {Chip} from "@mui/material";

interface TaskStatusChipProps {
    status: TodoTaskStatus;
    onClick?: () => void;
}

const TaskStatusChip = ({status, onClick}: TaskStatusChipProps) => {
    const getStatusConfig = (status: TodoTaskStatus) => {
        switch (status) {
            case TodoTaskStatus.Todo:
                return {
                    label: 'To Do',
                    color: 'default' as const,
                    icon: <RadioButtonUncheckedIcon/>,
                };
            case TodoTaskStatus.InProgress:
                return {
                    label: 'In Progress',
                    color: 'primary' as const,
                    icon: <AccessTimeIcon/>,
                };
            case TodoTaskStatus.Done:
                return {
                    label: 'Done',
                    color: 'success' as const,
                    icon: <CheckCircleIcon/>,
                };
            default:
                return {
                    label: 'Unknown',
                    color: 'default' as const,
                    icon: <RadioButtonUncheckedIcon/>,
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <Chip
            label={config.label}
            color={config.color}
            icon={config.icon}
            onClick={onClick}
            clickable={!!onClick}
            sx={{fontWeight: 500}}
            size="small"
        />
    );
}

export default TaskStatusChip;