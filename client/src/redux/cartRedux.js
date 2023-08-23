import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    Total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, price } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.TotalPrice = price * existingProduct.quantity;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
          TotalPrice: price,
        });
      }

      state.quantity += 1;
      state.Total += parseInt(price);
    },
    removeProduct: (state, action) => {
      const { id } = action.payload;
      const removedProduct = state.products.find(
        (product) => product.id === id
      );

      if (removedProduct) {
        state.quantity -= removedProduct.quantity;
        state.Total -= removedProduct.quantity * removedProduct.price;
        removedProduct.TotalPrice = 0; // Corrected typo here
        state.products = state.products.filter((product) => product.id !== id);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.Total = 0;
    },
    decreaseProduct: (state, action) => {
      const { id } = action.payload;
      const decreasedProduct = state.products.find(
        (product) => product.id === id
      );

      if (decreasedProduct) {
        decreasedProduct.quantity -= 1;
        state.quantity -= 1;
        state.Total -= decreasedProduct.price;
        decreasedProduct.TotalPrice -= decreasedProduct.price; // Corrected calculation here
        if (decreasedProduct.quantity === 0) {
          state.products = state.products.filter(
            (product) => product.id !== id
          );
        }
      }
    },
    increaseProduct: (state, action) => {
      const { id } = action.payload;
      const increasedProduct = state.products.find(
        (product) => product.id === id
      );

      if (increasedProduct) {
        increasedProduct.quantity += 1;
        state.quantity += 1;
        increasedProduct.TotalPrice += increasedProduct.price;
        state.Total += increasedProduct.price;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProduct,
  decreaseProduct,
  updateProduct,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
