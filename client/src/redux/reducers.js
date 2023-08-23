import { combineReducers } from 'redux';
import courseReducer from './Courselice';
import cartReducer from './cartRedux';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  course: courseReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;