import { configureStore } from '@reduxjs/toolkit';
import productsList from './productsListSlice';
import orders from './ordersSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    orders: orders,
    products: productsList
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
