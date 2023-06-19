import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  modal: modalReducer,
});

export default rootReducer;
