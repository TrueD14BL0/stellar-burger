import Api from "../../components/Api/Api";
import { PASSWORD_RESET_ERROR, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS } from "../../utils/const";
import { AppThunk, TResetData } from "../types/types";

export interface IResetRequest{
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IResetSuccess{
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IResetError{
  readonly type: typeof PASSWORD_RESET_ERROR;
  err: string;
}

export const resetPasswordAction:AppThunk<void> = (resetData: TResetData) => {
  return (dispatch) => {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    })

    Api.resetPassword(resetData)
    .then((data)=>{
      if(data.success){
        dispatch(resetPasswordSuccess());
      }else{
        dispatch(resetPasswordErr('Some trouble with received data.'))
      }
    })
    .catch((err: string)=>{
      dispatch(resetPasswordErr(err))
    });
  }
}

export const resetPasswordSuccess = (): IResetSuccess => {
  return {
      type: PASSWORD_RESET_SUCCESS,
  }
}

export const resetPasswordErr = (err: string): IResetError => {
  return {
      type: PASSWORD_RESET_ERROR,
      err,
  }
}

export type TResetActions = IResetRequest|IResetSuccess|IResetError;
