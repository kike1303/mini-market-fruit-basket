import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './product-amount.module.css'

const ProductAmount: React.FC<{ id: number }> = ({ id }) => {
    const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);

    const quantity = cartProducts.find(product => product.id === id)?.quantity || 0;
    return (
        <div className={styles.badge}>
            {quantity}
        </div>

    );
}

export default ProductAmount;
