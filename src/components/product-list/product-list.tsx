"use client";

import { useState } from 'react';
import { fetchProducts } from "@/services/products-service";
import Title from "../title/title";
import { ProductDetails } from "@/shared/interfaces/product-interface";
import styles from './product-list.module.css';
import Image from 'next/image';
import ProductAmount from '../product-amount/product-amount';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProductInfo, showShoppingCart } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { showModalComponent } from '../../redux/modalSlice';

const ProductList = () => {   
  const title = 'Store';
  const products = fetchProducts();
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const cartProducts: ProductDetails[] = useSelector((state: RootState) => state.cart.cartProducts);
  const dispatch = useDispatch();
    

  const handleShowProduct = (product: ProductDetails) => {
    const productToSet: ProductDetails = cartProducts.find(item => item.id === product.id) ?? product;
    setClickedCard(productToSet.id);
    dispatch(setProductInfo(productToSet));
    dispatch(showShoppingCart(false));
    dispatch(showModalComponent(true));
  };


  return (
    <div className={styles.container}>    
      <Title title={title}></Title>
      <div className={styles.grid}>
        {products.map((item: ProductDetails) => (
          <div
            key={item.id}
            className={`${styles.card} ${clickedCard === item.id ? styles.clicked : ''}`}
            onClick={() => handleShowProduct(item)}
          >
            {cartProducts.find((product) => (product.id === item.id && product.quantity && product.quantity > 0)) && (
              <ProductAmount id={item.id}></ProductAmount>
            )}
            <div className={styles.imageContainer}>
              <Image src={item.image} alt={item.name} fill className={styles.image} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
  
export default ProductList;