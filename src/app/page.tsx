'use client';

import Header from '@/components/header/header'
import ProductList from '@/components/product-list/product-list';
import styles from './page.module.css'
import ProductDetailsCart from '@/components/product-details-cart/product-details-cart';
import Title from '@/components/title/title';
import { ProductDetails } from '@/shared/interfaces/product-interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Cart from '@/components/cart/cart';
import Modal from '@/components/modal/modal';

export default function Home() {
  const productInfo: ProductDetails | null = useSelector((state: RootState) => state.cart.selectedProductInfo);
    const showingCart: boolean = useSelector((state: RootState) => state.cart.showCart);
    const showModal: boolean = useSelector((state: RootState) => state.modal.showModal);

    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <ProductList></ProductList>
                </div>     
                <div className={styles.rightContainer}>
                    {!productInfo && !showingCart && 
                        <>
                            <Title></Title>
                            <p>Please choose a product on the left.</p>
                        </>
                
                    }                  
                    {productInfo && !showingCart &&
                        <ProductDetailsCart></ProductDetailsCart>
                    }

                    {showingCart && 
                        <Cart></Cart>
                    }
                </div>
            </div>
            
            { showModal &&
                <div className={styles.modalContainer}>

                    {productInfo && !showingCart &&
                        <Modal>
                            <ProductDetailsCart></ProductDetailsCart>
                        </Modal>
                    }

                    {showingCart && 
                        <Modal>
                            <Cart></Cart>
                        </Modal>                      
                    }                           
                </div>
            }

            
        </>
    
    )
}
