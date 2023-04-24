import Api from "../../components/Api/Api";
import { LOGIN_CLEAR, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../utils/const";
import { AppThunk, TLoginData } from "../types/types";

export interface ILoginRequest{
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginClear{
  readonly type: typeof LOGIN_CLEAR;
}

export interface ILoginSuccess{
  readonly type: typeof LOGIN_SUCCESS;
  token: string;
  refreshToken: string;
}

export interface ILoginErr{
  readonly type: typeof LOGIN_ERROR;
  err: string;
}

export const loginAction: AppThunk<void> = (loginData: TLoginData) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    })

    Api.getAuthLogin(loginData)
    .then((data)=>{
      if(data.success){
        dispatch(loginSuccess(data.accessToken, data.refreshToken));
      }else{
        dispatch(loginErr('Some trouble with received data.'))
      }
    })
    .catch((err: string)=>{
      dispatch(loginErr(err))
    });
  }
}

export const loginSuccess = (token: string, refreshToken: string): ILoginSuccess => {
  return {
      type: LOGIN_SUCCESS,
      token,
      refreshToken,
  }
}

export const loginErr = (err: string): ILoginErr => {
  return {
      type: LOGIN_ERROR,
      err,
  }
}

export type TLoginActions = ILoginRequest|ILoginSuccess|ILoginErr|ILoginClear;
