import { createSlice } from '@reduxjs/toolkit';
import { updateObjectArray } from '../utils/helpers';

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = updateObjectArray(action.payload, state.orders);
    },
    changeAmountOfProduct: (state, action) => {
      state.orders = state.orders.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            amount: action.payload.amount,
          };
        }
        return item;
      });
    },
  },
});

export const { addOrder, changeAmountOfProduct } = ordersSlice.actions;

export const selectOrders = (state) => state.orders;

export default ordersSlice.reducer;
