import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import {useAppDispatch} from '@hooks/hooks';
import '@testing-library/jest-dom';
import {deleteTodo} from "@features/todos/todosSlice.ts";
import {act} from "react";

jest.mock('@hooks/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock('@features/todos/todosSlice', () => ({
    deleteTodo: jest.fn(),
}));

jest.mock('@mui/icons-material/WarningAmber', () => () => <svg data-testid="warning-icon"/>);

describe('DeleteConfirmationDialog', () => {
    const mockDispatch = jest.fn();
    const mockOnClose = jest.fn();
    const useAppDispatchMock = useAppDispatch as jest.Mock;

    const defaultProps = {
        open: true,
        onClose: mockOnClose,
        taskId: 1,
        taskTitle: 'Test Task to Delete',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useAppDispatchMock.mockReturnValue(mockDispatch);
    });

    it('renders the dialog correctly when open', () => {
        // Arrange & Act
        render(<DeleteConfirmationDialog {...defaultProps} />);

        // Assert
        expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
        expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete the task/)).toBeInTheDocument();
        expect(screen.getByText(`"${defaultProps.taskTitle}"`)).toBeInTheDocument();
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Cancel/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Delete/i})).toBeInTheDocument();
    });

    it('does not render the dialog when open is false', () => {
        // Arrange & Act
        render(<DeleteConfirmationDialog {...defaultProps} open={false}/>);

        // Assert
        expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
        expect(screen.queryByText(`"${defaultProps.taskTitle}"`)).not.toBeInTheDocument();
    });

    it('calls onClose when the Cancel button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        render(<DeleteConfirmationDialog {...defaultProps} />);

        // Act
        await user.click(screen.getByRole('button', {name: /Cancel/i}));

        // Assert
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('dispatches deleteTodo, shows loading state, and calls onClose on successful deletion', async () => {
        // Arrange
        const user = userEvent.setup();
        let resolvePromise: (value?: unknown) => void;
        const mockPromise = new Promise(resolve => {
            resolvePromise = resolve;
        });
        mockDispatch.mockReturnValue({unwrap: () => mockPromise});

        render(<DeleteConfirmationDialog {...defaultProps} />);

        // Act
        const deleteButton = screen.getByRole('button', {name: /Delete/i});
        await user.click(deleteButton);

        // Assert
        const deletingButton = await screen.findByRole('button', {name: /Deleting.../i});
        expect(deletingButton).toBeDisabled();
        expect(screen.getByRole('button', {name: /Cancel/i})).toBeDisabled();
        expect(mockDispatch).toHaveBeenCalledWith(deleteTodo(defaultProps.taskId));

        await act(async () => {
            resolvePromise();
        });

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    it('handles deletion failure, logs an error, and keeps the dialog open', async () => {
        // Arrange
        const user = userEvent.setup();
        const errorMessage = 'Failed to delete';
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
        let rejectPromise: (reason?: unknown) => void;
        const mockPromise = new Promise((_, reject) => {
            rejectPromise = reject;
        });
        mockDispatch.mockReturnValue({unwrap: () => mockPromise});
        render(<DeleteConfirmationDialog {...defaultProps} />);

        // Act
        await user.click(screen.getByRole('button', {name: /Delete/i}));

        // Assert
        expect(screen.getByRole('button', {name: /Deleting.../i})).toBeDisabled();

        await act(async () => {
            rejectPromise(errorMessage);
        });

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to delete task:", errorMessage);
        });

        expect(mockOnClose).not.toHaveBeenCalled();
        expect(screen.getByRole('button', {name: /Delete/i})).toBeEnabled();
        expect(screen.getByRole('button', {name: /Cancel/i})).toBeEnabled();

        consoleErrorSpy.mockRestore();
    });
});