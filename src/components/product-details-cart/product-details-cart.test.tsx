import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductDetailsCart from './product-details-cart';

const mockStore = configureStore();

describe('ProductDetailsCart', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            cart: {
                selectedProductInfo: {
                    id: 1,
                    name: 'Product 1',
                    price: 50.00,
                    quantity: 2,
                    image: '/path/to/image.jpg',
                    description: 'This is a product description.',
                },
                cartProducts: [
                    {
                        id: 1,
                        name: 'Product 1',
                        quantity: 2,
                        image: '/path/to/image.jpg',
                        description: 'This is a product description.',
                    },
                ],
            },
        });

        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <ProductDetailsCart />
            </Provider>
        );
    });

    test('renders the product details', () => {
        const productName = screen.getByText('Product 1');
        const productPrice = screen.getByText('$50.00');
        const productDescription = screen.getByText('This is a product description.');

        expect(productName).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
    });

    test('increment button dispatches action to increment quantity', () => {
        const incrementButton = screen.getByText('+');
        fireEvent.click(incrementButton);

        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    test('decrement button dispatches action to decrement quantity', () => {
        const decrementButton = screen.getByText('-');
        fireEvent.click(decrementButton);

        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
});
