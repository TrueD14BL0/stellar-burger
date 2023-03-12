import { CLEAR_USER, SET_USER, USER_DATA_PATCH_REQUEST, USER_REQUEST, USER_REQUEST_ERROR } from "../../utils/const";
import Api from "../../components/Api/Api";
import { deleteCookie, getCookie, setTokenCookies } from "../../utils/utils";

export function setUserAction(user){
  return {
      type: SET_USER,
      user,
  }
}

export function clearUserAction(){
  return {
      type: CLEAR_USER,
  }
}

function userRequestErr(err){
  return {
      type: USER_REQUEST_ERROR,
      err,
  }
}

function refreshToken(funcRequest, param, funcToDispatch){
  return (dispatch) => {
    Api.getAccessToken(getCookie('refreshToken'))
    .then((data)=>{
      setTokenCookies(data.accessToken, data.refreshToken)
      dispatch(requestToServerWithToken(funcRequest, param, funcToDispatch));
    })
    .catch((err)=>{
      deleteCookie('token');
      deleteCookie('refreshToken');
      dispatch(userRequestErr(err));
    });
  }
}

function requestToServerWithToken(funcRequest, param, funcToDispatch){
  return (dispatch) => {
    if(getCookie('token')){
      Api[funcRequest](getCookie('token'), param)
        .then((data)=>{
          if(data.success){
            dispatch(funcToDispatch(data.user));
          }
        })
        .catch((err)=>{
          if(err===401||err===403){
            dispatch(refreshToken(funcRequest, param, funcToDispatch));
          }else{
            dispatch(userRequestErr(err));
          }
        }
      );
    }else{
      dispatch(refreshToken(funcRequest, param, funcToDispatch));
    }
  }
}

export function userRequest(){
  return (dispatch) => {
    dispatch({
      type: USER_REQUEST,
    });
    dispatch(requestToServerWithToken('getUserInfo', null, setUserAction));
  }
}

export function userDataPatch(userNewData){
  return (dispatch) => {
    dispatch({
      type: USER_DATA_PATCH_REQUEST,
    });
    dispatch(requestToServerWithToken('patchUserInfo', userNewData, setUserAction));
  }
}


