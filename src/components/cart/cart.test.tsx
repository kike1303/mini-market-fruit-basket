import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './cart';

const mockStore = configureStore();

describe('Cart', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                totalAmount: 100.00,
                cartProducts: [
                    {   
                        id: 1,
                        price: 50.00,
                        name: 'product name',
                        quantity: 1,
                        image: '/path/to/image.jpg',
                        description: 'product description.',
                    },
                    {   
                        id: 2,
                        price: 50.00,
                        name: 'product 2 name',
                        quantity: 1,
                        image: '/path/to/image.jpg',
                        description: 'product description.',
                    },
                ],
            },
        });

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
    });

    test('renders the shopping cart title', () => {
        const title = screen.getByText('Shopping Cart');
        expect(title).toBeInTheDocument();
    });

    test('displays the total amount', () => {
        const totalAmount = screen.getByText(/Total:/i);
        const totalPrice = screen.getByText('$100.00');
        expect(totalAmount).toBeInTheDocument();
        expect(totalPrice).toBeInTheDocument();
    });
});
