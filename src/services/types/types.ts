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
import { TOrderSocketActions, TUserOrderSocketActions } from "../actions/OrdersActions";

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

export type TDNDObj = {
  index: number,
}

export type TOrdersFeed = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
}

export type TOrdersResponse = {
  success: boolean,
  total: number,
  totalToday: number,
  orders: TOrdersFeed[],
}

export type TOrdersState = {
  connected: boolean,
  orders: TOrdersFeed[],
  total: number,
  totalToday: number,
  error: any,
};

export type TWSActions = {
  init: string,
  onOpen: string,
  onClose: string,
  close: string,
  onError: string,
  onMessage: string,
  initUserOrder: string,
  onOpenUserOrder: string,
  onCloseUserOrder: string,
  closeUserOrder: string,
  onErrorUserOrder: string,
  onMessageUserOrder: string,
}

export type TFetchOptions = {
  method: "POST"|"GET"|"PATCH",
  headers: {
    "Content-Type": string,
    authorization?: string,
  },
  body?: string,
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TConstructorListActions|TForgotPasswordActions|TIngredientListActions|TIngredientObjActions|TLoginActions|TLogoutActions
  |TOrderActions|TUserOrderSocketActions|TOrderSocketActions|TUserRegisterActions|TResetActions|TUserInfosActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
