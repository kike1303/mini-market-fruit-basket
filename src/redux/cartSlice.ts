import { ProductDetails } from '@/shared/interfaces/product-interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  showCart: boolean;
  selectedProductInfo: ProductDetails | null;
  cartProducts: ProductDetails[];
  totalAmount: number;
}

const initialState: CartState = {
  showCart: false,
  selectedProductInfo: null,
  cartProducts: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showShoppingCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload;
    },
    setProductInfo: (state, action: PayloadAction<ProductDetails>) => {
      state.selectedProductInfo = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductDetails>) => {
      const existingProduct = state.cartProducts.find((product) => product.id === action.payload.id);
      if (existingProduct?.quantity) {
        existingProduct.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
      localStorage.setItem('totalAmount', String(state.totalAmount.toFixed(2)));
    },
    removeToCart: (state, action: PayloadAction<ProductDetails>) => {
      const existingProduct = state.cartProducts.find((product) => product.id === action.payload.id);
      if (existingProduct?.quantity && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
      }
      state.totalAmount -= action.payload.price;
      if (state.totalAmount < 0) {
        state.totalAmount = 0;
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    addCompleteCart: (state, action: PayloadAction<ProductDetails[]>) => {
      state.cartProducts = action.payload;
    },
    addTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
  },
});

export const { showShoppingCart, setProductInfo, addToCart, removeToCart, addCompleteCart, addTotalAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
