import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductAmount from './product-amount';

const mockStore = configureStore();

describe('ProductAmount', () => {
    test('shows the correct quantity when product is in cart', () => {
        const store = mockStore({
            cart: {
                cartProducts: [
                    { id: 1, quantity: 5 },
                    { id: 2, quantity: 3 },
                ],
            },
        });

        render(
            <Provider store={store}>
                <ProductAmount id={1} />
            </Provider>
        );

        const badgeElement = screen.getByText('5');
        expect(badgeElement).toBeInTheDocument();
    });

    test('shows 0 when product is not in cart', () => {
        const store = mockStore({
            cart: {
                cartProducts: [
                    { id: 2, quantity: 3 },
                ],
            },
        });

        render(
            <Provider store={store}>
                <ProductAmount id={1} />
            </Provider>
        );

        const badgeElement = screen.getByText('0');
        expect(badgeElement).toBeInTheDocument();
    });
});
