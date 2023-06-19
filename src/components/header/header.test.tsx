import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from './header';

const mockStore = configureStore();

describe('Header', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                totalAmount: 123.45,
                showCart: false,
            },
        });

        Storage.prototype.getItem = jest.fn(key => {
            switch (key) {
                case 'totalAmount':
                    return JSON.stringify(123.45);
                case 'cartProducts':
                    return JSON.stringify([]);
                default:
                    return null;
            }
        });

        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
    });

    test('renders logo and shopping cart with total amount', () => {
        const logo = screen.getByAltText('Descripción de la imagen');
        const cartIcon = screen.getByAltText('shopping-cart');
        const totalAmount = screen.getByText('$123.45');

        expect(logo).toBeInTheDocument();
        expect(cartIcon).toBeInTheDocument();
        expect(totalAmount).toBeInTheDocument();
    });

    test('shows close icon when shopping cart is clicked', () => {
        const cart = screen.getByAltText('shopping-cart');
        fireEvent.click(cart);
    
        store = mockStore({
            cart: {
                totalAmount: 12.34,
                showCart: true,
            },
        });
    
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
    
        const closeIcon = screen.getByAltText('close');
        expect(closeIcon).toBeInTheDocument();
    });
    
});
