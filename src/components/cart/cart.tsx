import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Title from "../title/title";
import { ProductDetails } from "@/shared/interfaces/product-interface";
import styles from './cart.module.css'
import ProductItem from "../product-item/product-item";
import WompiWidget from "../wompi-widget/wompi-widget";

const Cart = () => {
    const title = 'Shopping Cart';

    const totalAmount: number = useSelector((state: RootState) => state.cart.totalAmount);
    const products: ProductDetails[] = useSelector((state: RootState) => state.cart.cartProducts);

    return (
        <>
            <Title title={title}></Title>
            <div>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
                <div className={styles.total}>Total: <span className={styles.price}>${totalAmount.toFixed(2)}</span></div>
                <WompiWidget></WompiWidget>
            </div>
        </>
    );
}
export default Cart;