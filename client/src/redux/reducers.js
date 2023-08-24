import { combineReducers } from 'redux';
import courseReducer from './Courselice';
import cartReducer from './cartRedux';
import userReducer from './userSlice';
import chipReducer from './chipSlice';

const rootReducer = combineReducers({
  course: courseReducer,
  cart: cartReducer,
  user: userReducer,
  chip: chipReducer,
});

export default rootReducer;