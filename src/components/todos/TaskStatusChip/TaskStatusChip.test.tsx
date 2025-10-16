import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TaskStatusChip from './TaskStatusChip';
import {TodoTaskStatus} from '@models/todo';

describe('TaskStatusChip', () => {
    it('should display To Do label for Todo status', () => {
        // Arrange & Act
        render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Assert
        expect(screen.getByText('To Do')).toBeInTheDocument();
    });

    it('should display In Progress label for InProgress status', () => {
        // Arrange & Act
        render(<TaskStatusChip status={TodoTaskStatus.InProgress}/>);

        // Assert
        expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('should display Done label for Done status', () => {
        // Arrange & Act
        render(<TaskStatusChip status={TodoTaskStatus.Done}/>);

        // Assert
        expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('should apply default color for Todo status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-colorDefault');
    });

    it('should apply primary color for InProgress status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.InProgress}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-colorPrimary');
    });

    it('should apply success color for Done status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Done}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-colorSuccess');
    });

    it('should display RadioButtonUnchecked icon for Todo status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Assert
        expect(container.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).toBeInTheDocument();
    });

    it('should display AccessTime icon for InProgress status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.InProgress}/>);

        // Assert
        expect(container.querySelector('[data-testid="AccessTimeIcon"]')).toBeInTheDocument();
    });

    it('should display CheckCircle icon for Done status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Done}/>);

        // Assert
        expect(container.querySelector('[data-testid="CheckCircleIcon"]')).toBeInTheDocument();
    });

    it('should be clickable when onClick is provided', () => {
        // Arrange & Act
        const mockOnClick = jest.fn();
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Todo} onClick={mockOnClick}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-clickable');
    });

    it('should not be clickable when onClick is not provided', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).not.toHaveClass('MuiChip-clickable');
    });

    it('should call onClick when chip is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        render(<TaskStatusChip status={TodoTaskStatus.Todo} onClick={mockOnClick}/>);

        // Act
        const chip = screen.getByText('To Do');
        await user.click(chip);

        // Assert
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when chip without onClick is clicked', async () => {
        // Arrange
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Act
        const chip = screen.getByText('To Do');
        await user.click(chip);

        // Assert
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('should render as small size', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-sizeSmall');
    });

    it('should have font weight 500', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveStyle({fontWeight: 500});
    });

    it('should handle unknown status gracefully', () => {
        // Arrange & Act
        render(<TaskStatusChip status={999 as TodoTaskStatus}/>);

        // Assert
        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });

    it('should apply default color for unknown status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={999 as TodoTaskStatus}/>);

        // Assert
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-colorDefault');
    });

    it('should display RadioButtonUnchecked icon for unknown status', () => {
        // Arrange & Act
        const {container} = render(<TaskStatusChip status={999 as TodoTaskStatus}/>);

        // Assert
        expect(container.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).toBeInTheDocument();
    });

    it('should handle multiple clicks on clickable chip', async () => {
        // Arrange
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        render(<TaskStatusChip status={TodoTaskStatus.InProgress} onClick={mockOnClick}/>);

        // Act
        const chip = screen.getByText('In Progress');
        await user.click(chip);
        await user.click(chip);
        await user.click(chip);

        // Assert
        expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('should render all status types correctly', () => {
        // Arrange & Act
        const {rerender} = render(<TaskStatusChip status={TodoTaskStatus.Todo}/>);
        expect(screen.getByText('To Do')).toBeInTheDocument();

        rerender(<TaskStatusChip status={TodoTaskStatus.InProgress}/>);
        expect(screen.getByText('In Progress')).toBeInTheDocument();

        rerender(<TaskStatusChip status={TodoTaskStatus.Done}/>);
        expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('should maintain clickability across different statuses', async () => {
        // Arrange
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const {rerender} = render(<TaskStatusChip status={TodoTaskStatus.Todo} onClick={mockOnClick}/>);

        // Act & Assert
        await user.click(screen.getByText('To Do'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);

        rerender(<TaskStatusChip status={TodoTaskStatus.InProgress} onClick={mockOnClick}/>);
        await user.click(screen.getByText('In Progress'));
        expect(mockOnClick).toHaveBeenCalledTimes(2);

        rerender(<TaskStatusChip status={TodoTaskStatus.Done} onClick={mockOnClick}/>);
        await user.click(screen.getByText('Done'));
        expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
});
