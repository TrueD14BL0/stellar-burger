export const INIT_ORDERS_SOCKET: 'INIT_ORDERS_SOCKET' = "INIT_ORDERS_SOCKET";
export const SUCCESS_ORDERS_SOCKET: 'SUCCESS_ORDERS_SOCKET' = "SUCCESS_ORDERS_SOCKET";
export const CLOSE_ORDERS_SOCKET: 'CLOSE_ORDERS_SOCKET' = "CLOSE_ORDERS_SOCKET";
export const GET_ORDERS_DATA: 'GET_ORDERS_DATA' = "GET_ORDERS_DATA";
export const ON_ERROR_SOCKET: 'ON_ERROR_SOCKET' = "ON_ERROR_SOCKET";
export const ON_CLOSE_SOCKET: 'ON_CLOSE_SOCKET' = "ON_CLOSE_SOCKET";

export interface IOrderSocketInit{
  readonly type: typeof INIT_ORDERS_SOCKET;
  payload: string;
}

export interface IOrderSocketSuccess{
  readonly type: typeof SUCCESS_ORDERS_SOCKET;
}

export interface IOrderSocketClose{
  readonly type: typeof CLOSE_ORDERS_SOCKET;
}

export interface IOrderSocketGetData{
  readonly type: typeof GET_ORDERS_DATA;
  payload: MessageEvent;
}

export interface IOrderSocketError{
  readonly type: typeof ON_ERROR_SOCKET;
  payload: Event;
}

export interface IOrderSocketOnClose{
  readonly type: typeof ON_CLOSE_SOCKET;
}

export type TOrderSocketActions = IOrderSocketClose|IOrderSocketError|IOrderSocketGetData
  |IOrderSocketInit|IOrderSocketOnClose|IOrderSocketSuccess;

export const INIT_USER_ORDERS_SOCKET: 'INIT_USER_ORDERS_SOCKET' = "INIT_USER_ORDERS_SOCKET";
export const SUCCESS_USER_ORDERS_SOCKET: 'SUCCESS_USER_ORDERS_SOCKET' = "SUCCESS_USER_ORDERS_SOCKET";
export const CLOSE_USER_ORDERS_SOCKET: 'CLOSE_USER_ORDERS_SOCKET' = "CLOSE_USER_ORDERS_SOCKET";
export const GET_USER_ORDERS_DATA: 'GET_USER_ORDERS_DATA' = "GET_USER_ORDERS_DATA";
export const ON_USER_ERROR_SOCKET: 'ON_USER_ERROR_SOCKET' = "ON_USER_ERROR_SOCKET";
export const ON_USER_CLOSE_SOCKET: 'ON_USER_CLOSE_SOCKET' = "ON_USER_CLOSE_SOCKET";

export interface IUserOrderSocketInit{
  readonly type: typeof INIT_USER_ORDERS_SOCKET;
}

export interface IUserOrderSocketSuccess{
  readonly type: typeof SUCCESS_USER_ORDERS_SOCKET;
}

export interface IUserOrderSocketClose{
  readonly type: typeof CLOSE_USER_ORDERS_SOCKET;
}

export interface IUserOrderSocketGetData{
  readonly type: typeof GET_USER_ORDERS_DATA;
  payload: MessageEvent;
}

export interface IUserOrderSocketError{
  readonly type: typeof ON_USER_ERROR_SOCKET;
  payload: Event;
}

export interface IUserOrderSocketOnClose{
  readonly type: typeof ON_USER_CLOSE_SOCKET;
}

export type TUserOrderSocketActions = IUserOrderSocketClose|IUserOrderSocketError|IUserOrderSocketGetData
|IUserOrderSocketInit|IUserOrderSocketOnClose|IUserOrderSocketSuccess;
