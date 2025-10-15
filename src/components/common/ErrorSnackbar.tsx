import {Alert, Snackbar} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@hooks/hooks';
import {clearError} from '@features/todos/todosSlice';

const ErrorSnackbar = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector((state) => state.todos);

    const handleClose = () => {
        dispatch(clearError());
    };

    return (
        <Snackbar
            open={!!error}
            autoHideDuration={10000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;