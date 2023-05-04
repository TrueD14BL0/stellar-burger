import Api from "../../components/Api/Api";
import { getCookie } from "../../utils/utils";
import { LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../utils/const";
import { AppThunk } from "../types/types";

export interface ILogoutRequest{
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess{
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutErr{
  readonly type: typeof LOGOUT_ERROR;
  err: string;
}

export const logoutAction: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    })

    Api.getLogout(getCookie('refreshToken')||'')
    .then((data)=>{
      if(data.success){
        dispatch(logoutSuccess());
      }else{
        dispatch(logoutErr('Some trouble with received data.'))
      }
    })
    .catch((err: string)=>{
      dispatch(logoutErr(err))
    });
  }
}

export const logoutSuccess = (): ILogoutSuccess => {
  return {
      type: LOGOUT_SUCCESS,
  }
}

export const logoutErr = (err: string): ILogoutErr => {
  return {
      type: LOGOUT_ERROR,
      err,
  }
}

export type TLogoutActions = ILogoutRequest|ILogoutSuccess|ILogoutErr;
