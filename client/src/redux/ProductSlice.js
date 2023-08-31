import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
  },

  reducers: {
    addproduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addproduct } = ProductSlice.actions;
export default ProductSlice.reducer;

export const selectProduct = (state) => state.product.products;
