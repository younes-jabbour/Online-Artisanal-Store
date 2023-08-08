import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartRedux";
// import productsReducer from "./productsRedux";

export default configureStore({
  reducer: {
    cart: cartReducer,
    // products: productsReducer,
  },
});
