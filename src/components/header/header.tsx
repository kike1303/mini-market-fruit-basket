import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addCompleteCart, addTotalAmount, showShoppingCart } from '../../redux/cartSlice';
import { useEffect } from 'react';
import { showModalComponent } from '../../redux/modalSlice';

const Header = () => {
    const totalAmount: number = useSelector((state: RootState) => state.cart.totalAmount);
    const showingCart: boolean = useSelector((state: RootState) => state.cart.showCart);
    const dispatch = useDispatch();

    useEffect(() => {
        const totalAmountLocalStorage = JSON.parse(localStorage.getItem('totalAmount') ?? '0');
        const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts') ?? '[]');
        dispatch(addCompleteCart(productsLocalStorage))
        dispatch(addTotalAmount(totalAmountLocalStorage))

    }, [dispatch]);

    const handleShowShoppingCart = (showCart: boolean) => {     
        dispatch(showShoppingCart(showCart));
        dispatch(showModalComponent(true));
    };

    return (
        <header className={styles.header}>
        <div className={styles.logo}>
        <Link href="/">
            <Image
                src="/images/logo-fruit-basket.png"
                alt="Descripción de la imagen"
                width={100}
                height={100}
            />
        </Link>
            
                
        </div>
        <div className={styles.priceContainer}>
            <div className={`${styles.price} ${showingCart ? styles.cartClicked : styles.normalCart}`} onClick={() => handleShowShoppingCart(true)}>
                <Image
                    className={styles.cartIcon}
                    src="/icons/shopping-cart-white.svg"
                    alt="shopping-cart"
                    width={20}
                    height={20} />
                <span className={styles.value}>${totalAmount.toFixed(2)}</span>
            </div>
            {showingCart &&
            <div className={styles.close} onClick={() => handleShowShoppingCart(false)}>
                <Image
                    src="/icons/close.svg"
                    alt="close"
                    width={20}
                    height={20} />
            </div>}

        </div>
        </header>
     
    );
    
}

export default Header;