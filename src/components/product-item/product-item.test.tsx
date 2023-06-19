import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from './product-item';
import { ProductDetails } from '@/shared/interfaces/product-interface';

describe('ProductItem', () => {

    const product: ProductDetails = {
        id: 1,
        name: 'Product 1',
        price: 50.00,
        quantity: 2,
        image: '/path/to/image.jpg',
        description: 'product description'
    };

    beforeEach(() => {
        render(<ProductItem product={product} />);
    });

    test('renders the product quantity', () => {
        const productQuantity = screen.getByText('2');
        expect(productQuantity).toBeInTheDocument();
    });

    test('renders the product image with alt text', () => {
        const productImage = screen.getByAltText('Product 1');
        expect(productImage).toBeInTheDocument();
    });
});
