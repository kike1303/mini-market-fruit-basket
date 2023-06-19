import { ProductDetails } from '@/shared/interfaces/product-interface';
import products from '../../data/products.json';

export const fetchProducts = (): ProductDetails[] => {
  return products;
};
