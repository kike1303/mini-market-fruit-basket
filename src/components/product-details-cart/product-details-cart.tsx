"use client";

import Title from '../title/title';
import styles from './product-details-cart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import { ProductDetails } from '@/shared/interfaces/product-interface';
import ProductAmount from '../product-amount/product-amount';
import { addToCart, setProductInfo, removeToCart } from '../../redux/cartSlice';

const ProductDetailsCart = () => {

    const title = 'Product'
    const productInfo: ProductDetails | null = useSelector((state: RootState) => state.cart.selectedProductInfo);

    const dispatch = useDispatch();

    const handleIncrement = (product: ProductDetails) => {
        const productToAdd: ProductDetails = {...product, quantity: (product.quantity || 0 ) + 1}
        dispatch(addToCart(product))  
        dispatch(setProductInfo(productToAdd));
    };

    const handleDecrement = (product: ProductDetails) => {
        const productToRemove = {...product}

        if (productToRemove.quantity) {
            productToRemove.quantity -= 1
            dispatch(removeToCart(productToRemove))
            dispatch(setProductInfo(productToRemove));
        }
        
    };

    return (
        <> 
            <Title title={title}></Title>
            { productInfo &&
                <div className={styles.productItem}>
                    <ProductAmount id={productInfo.id}></ProductAmount>
                    <div className={styles.imageContainer}>
                        <Image src={productInfo.image} alt={productInfo.name} fill className={styles.image} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.titlePrice}>
                            <span className={styles.name}>{productInfo.name}</span>
                            <span className={styles.price}>${productInfo.price.toFixed(2)}</span>
                        </div>
                        <div className={styles.quantityControls}>
                            <button className={styles.removeProduct} onClick={() => handleDecrement(productInfo)}>-</button>        
                            <button className={styles.addProduct} onClick={() => handleIncrement(productInfo)}>+</button>
                        </div>
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.description}>{productInfo.description}</div>
                    <div className={styles.separator}></div>
                </div>
                
            }
        </>
    );
} 

export default ProductDetailsCart;