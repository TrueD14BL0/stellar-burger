import { combineReducers } from "redux";
import constructorListReducer from './constructorListReducer';
import ingridientObjReducer from './ingridientObjReducer';
import ingridientsListReducer from './ingridientsListReducer';
import orderObjReducer from './orderObjReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import registerUserReducer from './registerUserReducer';
import resetPasswordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  constructorListReducer,
  ingridientObjReducer,
  ingridientsListReducer,
  orderObjReducer,
  forgotPasswordReducer,
  registerUserReducer,
  resetPasswordReducer,
  loginReducer,
});

export default rootReducer;
