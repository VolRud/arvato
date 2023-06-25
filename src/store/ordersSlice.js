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
  },
});

export const {
    addOrder
} = ordersSlice.actions;

export const selectOrders = (state) => state.orders;


export default ordersSlice.reducer;
