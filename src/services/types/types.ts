import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TConstructorListActions } from "../actions/constructorList";
import { TForgotPasswordActions } from "../actions/forgotPassword";
import { TIngredientListActions } from "../actions/ingridientList";
import store from "../store/store";
import { TIngredientObjActions } from "../actions/ingridientObj";
import { TLoginActions } from "../actions/loginActions";
import { TLogoutActions } from "../actions/logoutActions";
import { TOrderActions } from "../actions/orderObj";
import { TUserRegisterActions } from "../actions/registerUser";
import { TResetActions } from "../actions/resetPassword";
import { TUserInfosActions } from "../actions/userActions";

export type TIngredient = {
  _id:string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  qty: number,
  key?:string,
}

export type TApiGetIngredients = {
  success: boolean,
  data: TIngredient[],
}

export type TForgotPassword = {
  success: boolean,
  message: string,
}

export type TUserData = {
  email: string,
  name: string,
}

export type TPatchUserData = {
  email?: string,
  name?: string,
  password?: string,
}

export type TRegUserData = TUserData & {
  password: string,
}

export type TLoginData = {
  email: string,
  password: string,
}

export type TResetData = {
  token: string,
  password: string,
}

export type TRefresh = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}

export type TLoginResponse = TRefresh & {
  user: TUserData,
}

export type TUserSuccess = {
  user: TUserData,
  success: boolean,
}

export type TLogoutResponse = {
  success: boolean,
  message: string,
}

export type TResetResponse = TLogoutResponse;

export type TOrder = {
  number:number,
}

export type TOrderResponse = {
  name:string,
  success: boolean,
  order: TOrder,
}

export type TIngredientList = {
  content: TIngredient[],
  bun: TIngredient,
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TConstructorListActions|TForgotPasswordActions|TIngredientListActions|TIngredientObjActions|TLoginActions|TLogoutActions|TOrderActions
  |TUserRegisterActions|TResetActions|TUserInfosActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
