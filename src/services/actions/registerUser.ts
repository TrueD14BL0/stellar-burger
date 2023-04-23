import Api from "../../components/Api/Api";
import { USER_REGISTRATION_ERROR, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_REQUEST } from "../../utils/const";
import { AppThunk, TRegUserData } from "../types/types";

export interface IRegisterUserRequest{
  readonly type: typeof USER_REGISTRATION_REQUEST;
}

export interface IRegisterUserSuccess{
  readonly type: typeof USER_REGISTRATION_SUCCESS;
}

export interface IRegisterUserError{
  readonly type: typeof USER_REGISTRATION_ERROR;
  err:string;
}

export const registerUser: AppThunk<void> = (registrObj: TRegUserData) => {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    })

    Api.registerUser(registrObj)
    .then((data)=>{
      if(data.success){
        dispatch(registerUserSuccess());
      }else{
        dispatch(registerUserErr('Some trouble with received data.'))
      }
    })
    .catch((err: string)=>{
      dispatch(registerUserErr(err))
    });
  }
}

export const registerUserSuccess = (): IRegisterUserSuccess => {
  return {
      type: USER_REGISTRATION_SUCCESS,
  }
}

export const registerUserErr = (err: string): IRegisterUserError => {
  return {
      type: USER_REGISTRATION_ERROR,
      err,
  }
}

export type TUserRegisterActions = IRegisterUserRequest|IRegisterUserSuccess|IRegisterUserError;
