import { combineReducers } from 'redux';
import courseReducer from './Courselice';
import cartReducer from './cartRedux';
import userReducer from './userSlice';
import chipReducer from './chipSlice';
import EnrollReducer from './EnrollSlice';
import productReducer from './ProductSlice';

const rootReducer = combineReducers({
  course: courseReducer,
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
  // chip: chipReducer,
  // enroll: EnrollReducer,
});

export default rootReducer;