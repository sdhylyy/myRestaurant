import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from './ItemList';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('ItemList component', () => {
    beforeEach(() => {
        render(<ItemList />);
    });

    test('renders Items header', () => {
        expect(screen.getByText('Items')).toBeInTheDocument();
    });

    test('renders menu items', () => {
        expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
        expect(screen.getByText('Grilled Chicken Caesar Salad')).toBeInTheDocument();
        expect(screen.getByText('Fish and Chips')).toBeInTheDocument();
        // ... add more menu items if desired
    });

    test('displays initial total price as $0.00', () => {
        expect(screen.getByText('Total Price: $0.00')).toBeInTheDocument();
    });

    test('renders Submit Order button', () => {
        expect(screen.getByText('Submit Order')).toBeInTheDocument();
    });
});
