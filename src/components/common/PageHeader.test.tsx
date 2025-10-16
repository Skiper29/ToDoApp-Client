import {render, screen} from '@testing-library/react';
import PageHeader from './PageHeader';
import '@testing-library/jest-dom';

describe('PageHeader', () => {
    it('should render the title correctly', () => {
        // Arrange & Act
        const title = 'My Tasks';
        render(<PageHeader title={title}/>);

        // Assert
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
    });

    it('should render the CheckCircleOutlineIcon', () => {
        // Arrange & Act
        render(<PageHeader title="My Tasks"/>);

        // Assert
        const iconElement = screen.getByTestId('CheckCircleOutlineIcon');
        expect(iconElement).toBeInTheDocument();
    });
});