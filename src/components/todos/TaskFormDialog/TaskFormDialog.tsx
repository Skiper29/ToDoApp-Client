import type {CreateTodoTaskDto, TodoTaskDto, UpdateTodoTaskDto} from "@models/todo.ts";
import {useAppDispatch} from "@hooks/hooks.ts";
import {useEffect, useState} from "react";
import {createTodo, updateTodo} from "@features/todos/todosSlice.ts";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker} from "@mui/x-date-pickers";

interface TaskFormDialogProps {
    open: boolean;
    onClose: () => void;
    task?: TodoTaskDto | null;
    mode: 'create' | 'edit';
}

interface FormData {
    title: string;
    content: string;
    deadline: Date | null;
}

interface FormErrors {
    title?: string;
    content?: string;
    deadline?: string;
}

export const TaskFormDialog = ({open, onClose, task, mode}: TaskFormDialogProps) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        deadline: null,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open && task && mode === 'edit') {
            setFormData({
                title: task.title,
                content: task.content || '',
                deadline: task.deadline ? new Date(task.deadline) : null,
            });
        } else if (open && mode === 'create') {
            setFormData({
                title: '',
                content: '',
                deadline: null,
            });
        }
        setFormErrors({});
        setIsSubmitting(false);
    }, [open, task, mode]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 200) {
            newErrors.title = 'Title must be less than 200 characters';
        }

        if (formData.content && formData.content.length > 2000) {
            newErrors.content = 'Content must be less than 2000 characters';
        } else if (formData.content && formData.content.length < 10) {
            newErrors.content = 'Content must be at least 10 characters';
        }

        if (formData.deadline && formData.deadline < new Date()) {
            newErrors.deadline = 'Deadline cannot be in the past';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            if (mode === 'create') {
                const dto: CreateTodoTaskDto = {
                    title: formData.title.trim(),
                    content: formData.content.trim() || undefined,
                    deadline: formData.deadline ? new Date(formData.deadline.toUTCString()) : undefined,
                };
                await dispatch(createTodo(dto)).unwrap();
            } else if (task) {
                const dto: UpdateTodoTaskDto = {
                    id: task.id,
                    title: formData.title.trim(),
                    content: formData.content.trim() || undefined,
                    deadline: formData.deadline ? new Date(formData.deadline.toUTCString()) : undefined,
                };
                await dispatch(updateTodo(dto)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Failed to submit form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {mode === 'create' ? 'Create New Task' : 'Edit Task'}
                <IconButton onClick={handleClose} disabled={isSubmitting} size="small">
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, pt: 1}}>
                    <TextField
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        error={!!formErrors.title}
                        helperText={formErrors.title}
                        fullWidth
                        required
                        autoFocus
                        disabled={isSubmitting}
                    />

                    <TextField
                        label="Description"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        error={!!formErrors.content}
                        helperText={formErrors.content}
                        fullWidth
                        multiline
                        rows={4}
                        disabled={isSubmitting}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Deadline"
                            value={formData.deadline}
                            onChange={(newValue) => setFormData({...formData, deadline: newValue})}
                            disabled={isSubmitting}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!formErrors.deadline,
                                    helperText: formErrors.deadline,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </DialogContent>

            <DialogActions sx={{px: 3, py: 2}}>
                <Button onClick={handleClose} disabled={isSubmitting}>
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskFormDialog;