import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {useAppDispatch} from "@hooks/hooks.ts";
import {useState} from "react";
import {deleteTodo} from "@features/todos/todosSlice.ts";

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    taskId: number;
    taskTitle: string;
}

const DeleteConfirmationDialog = ({
                                      open,
                                      onClose,
                                      taskId,
                                      taskTitle,
                                  }: DeleteConfirmationDialogProps) => {
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await dispatch(deleteTodo(taskId)).unwrap();
            onClose();
        } catch (error) {
            console.error("Failed to delete task:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <WarningAmberIcon color="warning"/>
                    Confirm Delete
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography>
                    Are you sure you want to delete the task{' '}
                    <strong>"{taskTitle}"</strong>?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                    This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{px: 3, py: 2}}>
                <Button onClick={onClose} disabled={isDeleting}>
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;