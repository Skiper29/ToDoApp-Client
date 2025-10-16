import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ErrorSnackbar from './ErrorSnackbar';
import todosReducer from '../../features/todos/todosSlice';
import type {RootState} from '@app/todo-store';

const createMockStore = (error: string | null = null) => {
    return configureStore({
        reducer: {
            todos: todosReducer,
        },
        preloadedState: {
            todos: {
                tasks: [],
                loading: false,
                error,
                selectedTask: null,
            },
        },
    });
};

describe('ErrorSnackbar', () => {
    it('should not display snackbar when there is no error', () => {
        // Arrange & Act
        const store = createMockStore(null);
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();
    });

    it('should display snackbar with error message when error exists', () => {
        // Arrange & Act
        const errorMessage = 'Failed to fetch todos';
        const store = createMockStore(errorMessage);
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(errorMessage);
    });

    it('should display snackbar with correct severity', () => {
        // Arrange & Act
        const store = createMockStore('Some error');
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('MuiAlert-filledError');
    });

    it('should close snackbar when close button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore('Failed to create todo');
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Act
        const closeButton = screen.getByRole('button', {name: /close/i});
        await user.click(closeButton);

        // Assert
        await waitFor(() => {
            const alert = screen.queryByRole('alert');
            expect(alert).not.toBeInTheDocument();
        });
    });

    it('should display different error messages correctly', () => {
        // Arrange & Act
        const customError = 'Network connection failed';
        const store = createMockStore(customError);
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        expect(screen.getByText(customError)).toBeInTheDocument();
    });

    it('should handle empty string error as no error', () => {
        // Arrange & Act
        const store = createMockStore('');
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();
    });

    it('should display snackbar at bottom center position', () => {
        // Arrange & Act
        const store = createMockStore('Error message');
        const {container} = render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        const snackbar = container.querySelector('.MuiSnackbar-root');
        expect(snackbar).toHaveClass('MuiSnackbar-anchorOriginBottomCenter');
    });

    it('should clear error from store when closed', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore('Failed to delete todo');
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Act
        const closeButton = screen.getByRole('button', {name: /close/i});
        await user.click(closeButton);

        // Assert
        await waitFor(() => {
            const state = store.getState() as RootState;
            expect(state.todos.error).toBeNull();
        });
    });

    it('should handle long error messages', () => {
        // Arrange & Act
        const longError = 'This is a very long error message that contains multiple details about what went wrong during the operation and provides extensive information to the user';
        const store = createMockStore(longError);
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it('should handle special characters in error message', () => {
        // Arrange & Act
        const specialError = 'Error: <script>alert("XSS")</script> & special "characters"';
        const store = createMockStore(specialError);
        render(
            <Provider store={store}>
                <ErrorSnackbar/>
            </Provider>
        );

        // Assert
        expect(screen.getByText(specialError)).toBeInTheDocument();
    });
});
