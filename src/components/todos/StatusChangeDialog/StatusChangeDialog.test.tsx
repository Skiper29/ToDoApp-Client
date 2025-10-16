import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StatusChangeDialog from './StatusChangeDialog';
import todosReducer from '@features/todos/todosSlice';
import {TodoTaskDto, TodoTaskStatus} from '@models/todo';
import {TodoApi} from '@api/todoApi';

jest.mock('@api/todoApi');

const mockTodoApi = TodoApi as jest.Mocked<typeof TodoApi>;

const createMockStore = () => {
    return configureStore({
        reducer: {
            todos: todosReducer,
        },
        preloadedState: {
            todos: {
                tasks: [],
                loading: false,
                error: null,
                selectedTask: null,
            },
        },
    });
};

const mockTodoTask: TodoTaskDto = {
    id: 1,
    title: 'Test Task',
    content: 'Test Description',
    status: TodoTaskStatus.Todo,
    createdAt: new Date(),
    finishedAt: new Date(),
    deadline: new Date(),
};

describe('StatusChangeDialog', () => {
    const mockOnClose = jest.fn();
    const defaultProps = {
        open: true,
        onClose: mockOnClose,
        taskId: 1,
        currentStatus: TodoTaskStatus.Todo,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoApi.updateStatus.mockResolvedValue(mockTodoTask);
    });

    it('should render dialog when open is true', () => {
        // Arrange & Act
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Assert
        expect(screen.getByText('Change Status')).toBeInTheDocument();
    });

    it('should not render dialog when open is false', () => {
        // Arrange & Act
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} open={false}/>
            </Provider>
        );

        // Assert
        expect(screen.queryByText('Change Status')).not.toBeInTheDocument();
    });

    it('should display all status options', () => {
        // Arrange & Act
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Assert
        expect(screen.getByText('To Do')).toBeInTheDocument();
        expect(screen.getByText('In Progress')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('should highlight current status option', () => {
        // Arrange & Act
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.InProgress}/>
            </Provider>
        );

        // Assert
        const inProgressButton = screen.getByText('In Progress').closest('div[role="button"]');
        expect(inProgressButton).toHaveClass('Mui-selected');
    });

    it('should display Cancel button', () => {
        // Arrange & Act
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Assert
        expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
    });

    it('should call onClose when Cancel button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Act
        const cancelButton = screen.getByRole('button', {name: 'Cancel'});
        await user.click(cancelButton);

        // Assert
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when close icon is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Act
        const closeButton = screen.getAllByRole('button')[0];
        await user.click(closeButton);

        // Assert
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should dispatch updateTodoStatus when different status is selected', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.Todo}/>
            </Provider>
        );

        // Act
        const inProgressOption = screen.getByText('In Progress');
        await user.click(inProgressOption);

        // Assert
        await waitFor(() => {
            expect(mockTodoApi.updateStatus).toHaveBeenCalledWith(1, {newStatus: TodoTaskStatus.InProgress});
        });
    });

    it('should close dialog after successful status update', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.Todo}/>
            </Provider>
        );

        // Act
        const doneOption = screen.getByText('Done');
        await user.click(doneOption);

        // Assert
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    it('should close dialog when same status is selected', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.Todo}/>
            </Provider>
        );

        // Act
        const todoOption = screen.getByText('To Do');
        await user.click(todoOption);

        // Assert
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    it('should not dispatch updateTodoStatus when same status is selected', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.InProgress}/>
            </Provider>
        );

        // Act
        const inProgressOption = screen.getByText('In Progress');
        await user.click(inProgressOption);

        // Assert
        await waitFor(() => {
            expect(mockTodoApi.updateStatus).not.toHaveBeenCalled();
        });
    });

    it('should handle status update failure', async () => {
        // Arrange
        const user = userEvent.setup();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        mockTodoApi.updateStatus.mockRejectedValue(new Error('Update failed'));

        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Act
        const doneOption = screen.getByText('Done');
        await user.click(doneOption);

        // Assert
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to update status:', 'Failed to update status');
        });

        consoleErrorSpy.mockRestore();
    });

    it('should not close dialog when status update fails', async () => {
        // Arrange
        const user = userEvent.setup();
        jest.spyOn(console, 'error').mockImplementation();
        mockTodoApi.updateStatus.mockRejectedValue(new Error('Update failed'));

        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Act
        const doneOption = screen.getByText('Done');
        await user.click(doneOption);

        // Assert
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
        });
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should re-enable buttons after failed status update', async () => {
        // Arrange
        const user = userEvent.setup();
        jest.spyOn(console, 'error').mockImplementation();
        mockTodoApi.updateStatus.mockRejectedValue(new Error('Update failed'));

        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} />
            </Provider>
        );

        // Act
        const doneOption = screen.getByText('Done');
        await user.click(doneOption);

        // Assert
        await waitFor(() => {
            expect(screen.getByRole('button', {name: 'Cancel'})).not.toBeDisabled();
        });
    });

    it('should update from Todo to InProgress status', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.Todo}/>
            </Provider>
        );

        // Act
        const inProgressOption = screen.getByText('In Progress');
        await user.click(inProgressOption);

        // Assert
        await waitFor(() => {
            expect(mockTodoApi.updateStatus).toHaveBeenCalledWith(1, {newStatus: TodoTaskStatus.InProgress});
        });
    });

    it('should update from InProgress to Done status', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.InProgress}/>
            </Provider>
        );

        // Act
        const doneOption = screen.getByText('Done');
        await user.click(doneOption);

        // Assert
        await waitFor(() => {
            expect(mockTodoApi.updateStatus).toHaveBeenCalledWith(1, {newStatus: TodoTaskStatus.Done});
        });
    });

    it('should update from Done to Todo status', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} currentStatus={TodoTaskStatus.Done}/>
            </Provider>
        );

        // Act
        const todoOption = screen.getByText('To Do');
        await user.click(todoOption);

        // Assert
        await waitFor(() => {
            expect(mockTodoApi.updateStatus).toHaveBeenCalledWith(1, {newStatus: TodoTaskStatus.Todo});
        });
    });

    it('should use correct taskId when updating status', async () => {
        // Arrange
        const user = userEvent.setup();
        const store = createMockStore();
        render(
            <Provider store={store}>
                <StatusChangeDialog {...defaultProps} taskId={42} currentStatus={TodoTaskStatus.Todo}/>
            </Provider>
        );

        // Act
        const doneOption = screen.getByText('Done');
        await user.click(doneOption);

        // Assert
        await waitFor(() => {
            expect(mockTodoApi.updateStatus).toHaveBeenCalledWith(42, {newStatus: TodoTaskStatus.Done});
        });
    });
});
