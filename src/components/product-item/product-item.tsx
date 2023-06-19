

import { ProductDetails } from '@/shared/interfaces/product-interface';
import styles from './product-item.module.css';
import Image from 'next/image';

const ProductItem: React.FC<{ product: ProductDetails}> = ({ product }) => {
   
  return (
    <>
        <div className={styles.productItem}>
            <div className={styles.productAmount}>
                {product.quantity}
            </div>
            <div className={styles.imageContainer}>
                <Image src={product.image} alt={product.name} className={styles.productImage} fill></Image>
            </div>
        </div>
        <div className={styles.separator}></div>
     </>
  );
};

export default ProductItem;
