import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const index = state.products.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.products[index].quantity += 1;
      } else {
        state.products.push(product);
      }
      state.quantity += 1;
      state.total += product.price;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
