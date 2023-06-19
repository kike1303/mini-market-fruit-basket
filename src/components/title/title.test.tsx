import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Title from './title';

describe('Title', () => {
    test('renders the title text', () => {
        render(<Title title="Test Title" />);
        const titleElement = screen.getByText('Test Title');
        expect(titleElement).toBeInTheDocument();
    });

    test('does not render title text if not provided', () => {
        const { container } = render(<Title />);
        const h1Element = container.querySelector('h1');
        expect(h1Element).toBeEmptyDOMElement();
    });
});
