export const OPEN_INGRIDIENT: 'OPEN_INGRIDIENT' = 'OPEN_INGRIDIENT';
export const CLOSE_INGRIDIENT: 'CLOSE_INGRIDIENT' = 'CLOSE_INGRIDIENT';
export const ADD_INGRIDIENT_TO_CONSTRUCTOR: 'ADD_INGRIDIENT_TO_CONSTRUCTOR' = 'ADD_INGRIDIENT_TO_CONSTRUCTOR';
export const DEL_INGRIDIENT_FROM_CONSTRUCTOR: 'DEL_INGRIDIENT_FROM_CONSTRUCTOR' = 'DEL_INGRIDIENT_FROM_CONSTRUCTOR';
export const DECRIMENT_INGRIDIENT_COUNT: 'DECRIMENT_INGRIDIENT_COUNT' = 'DECRIMENT_INGRIDIENT_COUNT';
export const SWAP_INGRIDIENT_IN_CONSTRUCTOR: 'SWAP_INGRIDIENT_IN_CONSTRUCTOR' = 'SWAP_INGRIDIENT_IN_CONSTRUCTOR';
export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_ERROR: 'ORDER_ERROR' = 'ORDER_ERROR';
export const ORDER_CLEAR: 'ORDER_CLEAR' = 'ORDER_CLEAR';
export const INGRIDIENTS_LIST_REQUEST: 'INGRIDIENTS_LIST_REQUEST' = 'INGRIDIENTS_LIST_REQUEST';
export const INGRIDIENTS_LIST_SUCCESS: 'INGRIDIENTS_LIST_SUCCESS' = 'INGRIDIENTS_LIST_SUCCESS';
export const INGRIDIENTS_LIST_ERROR: 'INGRIDIENTS_LIST_ERROR' = 'INGRIDIENTS_LIST_ERROR';
export enum Tabs {
  BUN = 'bun',
  SAUCE ='sauce',
  MAIN = 'main',
};
export const PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST' = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS' = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR: 'PASSWORD_RESET_ERROR' = 'PASSWORD_RESET_ERROR';
export const USER_REGISTRATION_REQUEST: 'USER_REGISTRATION_REQUEST' = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS: 'USER_REGISTRATION_SUCCESS' = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR: 'USER_REGISTRATION_ERROR' = 'USER_REGISTRATION_ERROR';
export const PASSWORD_FORGOT_REQUEST: 'PASSWORD_FORGOT_REQUEST' = 'PASSWORD_FORGOT_REQUEST';
export const PASSWORD_FORGOT_SUCCESS: 'PASSWORD_FORGOT_SUCCESS' = 'PASSWORD_FORGOT_SUCCESS';
export const PASSWORD_FORGOT_ERROR: 'PASSWORD_FORGOT_ERROR' = 'PASSWORD_FORGOT_ERROR';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const CLEAR_USER: 'CLEAR_USER' = 'CLEAR_USER';
export const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';
export const USER_DATA_PATCH_REQUEST: 'USER_DATA_PATCH_REQUEST' = 'USER_DATA_PATCH_REQUEST';
export const USER_REQUEST_ERROR: 'USER_REQUEST_ERROR' = 'USER_REQUEST_ERROR';
export const LOGOUT_ERROR: 'LOGOUT_ERROR' = 'LOGOUT_ERROR';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGIN_CLEAR: 'LOGIN_CLEAR' = 'LOGIN_CLEAR';
export const WS_URL: string = 'wss://norma.nomoreparties.space/orders';
export const MAX_VISIBLE_INGREDIENTS_IN_ORDER: number = 5;

/* Pages Constants*/
export enum PAGES{
  MAIN_PAGE ="/",
  INGRIDIENTS_PAGE = "ingredients",
  LOGIN_PAGE = "/login",
  LOGOUT_PAGE = "/logout",
  REGISTER_PAGE = "/register",
  FORGOT_PAGE = "/forgot-password",
  RESET_PAGE = "/reset-password",
  PROFILE_PAGE = "/profile",
  ORDERS_PAGE = "orders",
  ANOTHER_PAGE = "*",
  FEED_PAGE = "/feed",
}

/* WS Action types*/
export enum WS_ACTION_TYPES{
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
  WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE',
}

/* Main content */
export enum MAIN_CONTENT_GAP{
  MAIN_CONTENT_GAP_FEED = 'MAIN_CONTENT_GAP_FEED',
  MAIN_CONTENT_GAP_STD = 'MAIN_CONTENT_GAP_STD',
}

/* Order reducers */
export enum ORDER_REDUCERS{
  ORDER_REDUCER = 'ordersReducer',
  USER_ORDER_REDUCER = 'userOrdersReducer',
}
