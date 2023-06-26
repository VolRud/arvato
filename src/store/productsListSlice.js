import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverRequest } from '../api/counterAPI';

const initialState = {
  isProductsLoaded: false,
  status: 'idle',
  products: [],
  filteredProducts: [],
};

export const getProductsList = createAsyncThunk(
  'produtsList/getProductsList',
  async () => {
    const { products } = await serverRequest();
    return products;
  }
);

export const productsListSlice = createSlice({
  name: 'productsList',
  initialState,
  reducers: {
    changeFilterState: (state, action) => {
      state.filterState = action.payload;
    },
    applyFilter: (state, action) => {
      state.filteredProducts = action.payload;
    },
    resetFilter: (state) => {
      state.filteredProducts = state.products;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsList.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.isProductsLoaded = true;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      });
  },
});

export const { changeFilterState, applyFilter, resetFilter } =
  productsListSlice.actions;

export const selectProducts = (state) => state.products;

export default productsListSlice.reducer;
