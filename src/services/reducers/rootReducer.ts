import { combineReducers } from "redux";
import constructorListReducer from './constructorListReducer';
import ingredientObjReducer from './ingredientObjReducer';
import ingredientsListReducer from './ingredientsListReducer';
import orderObjReducer from './orderObjReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import registerUserReducer from './registerUserReducer';
import resetPasswordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import logoutReducer from './logoutReducer';
import ordersReducer from './ordersReducer';
import userOrdersReducer from './userOrdersReducer';

const rootReducer = combineReducers({
  constructorListReducer,
  ingredientObjReducer,
  ingredientsListReducer,
  orderObjReducer,
  forgotPasswordReducer,
  registerUserReducer,
  resetPasswordReducer,
  loginReducer,
  userReducer,
  logoutReducer,
  ordersReducer,
  userOrdersReducer,
});

export default rootReducer;
