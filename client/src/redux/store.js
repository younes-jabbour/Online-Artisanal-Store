import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import cartReducer from "./cartRedux";
import userReducer from "./userSlice";
// import productsReducer from "./productsRedux";

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    // products: productsReducer,
  },
  middleware: [thunkMiddleware],
});
