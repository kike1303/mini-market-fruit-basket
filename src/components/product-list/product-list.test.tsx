import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from './product-list';
import { fetchProducts } from '../../services/products-service';

jest.mock('../../services/products-service');

describe('ProductList', () => {

    const mockStore = configureStore();
    const store = mockStore({
        cart: {
            cartProducts: [],
        },
    });

    const mockProducts = [
        { id: 1, name: 'Product 1', image: '/path/to/image1.jpg' },
        { id: 2, name: 'Product 2', image: '/path/to/image2.jpg' },
    ];

    beforeEach(() => {
        fetchProducts.mockReturnValue(mockProducts);
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
    });

    test('renders the product list', () => {
        mockProducts.forEach(product => {
            const productImage = screen.getByAltText(product.name);
            expect(productImage).toBeInTheDocument();
        });
    });
});
