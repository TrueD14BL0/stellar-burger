import { CLEAR_USER, SET_USER, USER_DATA_PATCH_REQUEST, USER_REQUEST, USER_REQUEST_ERROR } from "../../utils/const";
import Api from "../../components/Api/Api";
import { deleteCookie, getCookie, setTokenCookies } from "../../utils/utils";
import { AppThunk, TPatchUserData, TUserData } from "../types/types";

export interface ISetUser{
  readonly type: typeof SET_USER;
  user: TUserData;
}

export interface IUserRequest{
  readonly type: typeof USER_REQUEST;
}

export interface IUserPatchRequest{
  readonly type: typeof USER_DATA_PATCH_REQUEST;
}

export interface IClearUser{
  readonly type: typeof CLEAR_USER;
}

export interface IUserError{
  readonly type: typeof USER_REQUEST_ERROR;
  err: string;
}

export const setUserAction = (user: TUserData): ISetUser => {
  return {
      type: SET_USER,
      user,
  }
}

export const clearUserAction = ():IClearUser => {
  return {
      type: CLEAR_USER,
  }
}

const userRequestErr = (err: string):IUserError => {
  return {
      type: USER_REQUEST_ERROR,
      err,
  }
}

const refreshToken:AppThunk<void> = (param: TPatchUserData|null) => {
  return (dispatch) => {
    Api.getAccessToken(getCookie('refreshToken')||'')
    .then((data)=>{
      setTokenCookies(data.accessToken, data.refreshToken)
      dispatch(requestToServerWithToken(param));
    })
    .catch((err)=>{
      deleteCookie('token');
      deleteCookie('refreshToken');
      dispatch(userRequestErr(err));
    });
  }
}

const requestToServerWithToken:AppThunk<void> = (param: TPatchUserData|null) => {
  return (dispatch) => {
    if(getCookie('token')){
      const funcRequest = (token: string, param:TPatchUserData|null) => {
        if(param){
          return Api.patchUserInfo(token, param);
        }else{
          return Api.getUserInfo(token);
        }
      };

      funcRequest(getCookie('token')||'', param)
        .then((data)=>{
          if(data.success){
            dispatch(setUserAction(data.user));
          }
        })
        .catch((err:string)=>{
          if(err==='401'||err==='403'){
            dispatch(refreshToken(param));
          }else{
            dispatch(userRequestErr(err));
          }
        }
      );
    }else{
      dispatch(refreshToken(param));
    }
  }
}

export const userRequest: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: USER_REQUEST,
    });
    dispatch(requestToServerWithToken(null));
  }
}

export const userDataPatch: AppThunk<void> = (userNewData: TPatchUserData) => {
  return (dispatch) => {
    dispatch({
      type: USER_DATA_PATCH_REQUEST,
    });
    dispatch(requestToServerWithToken(userNewData));
  }
}

export type TUserInfosActions = ISetUser|IUserRequest|IUserPatchRequest|IClearUser|IUserError;
