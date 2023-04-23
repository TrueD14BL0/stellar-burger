import Api from "../../components/Api/Api";
import { PASSWORD_FORGOT_ERROR, PASSWORD_FORGOT_REQUEST, PASSWORD_FORGOT_SUCCESS } from "../../utils/const";
import { AppDispatch, AppThunk } from "../types/types";

export interface IForgotPasswordRequest{
  readonly type: typeof PASSWORD_FORGOT_REQUEST;
}

export interface IForgotPasswordSuccess{
  readonly type: typeof PASSWORD_FORGOT_SUCCESS;
}

export interface IForgotPasswordErr{
  readonly type: typeof PASSWORD_FORGOT_ERROR;
  err: string;
}

export const forgotPasswordAction: AppThunk<void> = (email: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: PASSWORD_FORGOT_REQUEST,
    })

    Api.forgotPassword(email)
    .then((data)=>{
      if(data.success){
        dispatch(forgotPasswordSuccess());
      }else{
        dispatch(forgotPasswordErr('Some trouble with received data.'))
      }
    })
    .catch((err: string)=>{
      dispatch(forgotPasswordErr(err))
    });
  }
}

export const forgotPasswordSuccess = (): IForgotPasswordSuccess => {
  return {
      type: PASSWORD_FORGOT_SUCCESS,
  }
}

export const forgotPasswordErr = (err: string): IForgotPasswordErr => {
  return {
      type: PASSWORD_FORGOT_ERROR,
      err,
  }
}

export type TForgotPasswordActions = IForgotPasswordSuccess|IForgotPasswordErr|IForgotPasswordRequest;
