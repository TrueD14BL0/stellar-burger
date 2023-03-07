import Api from "../../components/Api/Api";
import { deleteCookie, getCookie, setTokenCookies } from "../../components/utils/utils";
import { USER_REQUEST, USER_REQUEST_ERROR } from "../../utils/const";
import { setUserAction } from "./userActions";

export function userRequest(){
  return (dispatch) => {
    dispatch({
      type: USER_REQUEST,
    })

    if(getCookie('token')){
      Api.getUserInfo(getCookie('token'))
        .then((data)=>{
          if(data.success){
            dispatch(setUserAction(data.user));
          }else{
            dispatch(refreshToken());
          }
        })
        .catch((err)=>{
          dispatch(userRequestErr(err));
        }
      );
    }else{
      dispatch(refreshToken());
    }
  }
}

function refreshToken(){
  return (dispatch) => {
    Api.getAccessToken(getCookie('refreshToken'))
    .then((data)=>{
      setTokenCookies(data.accessToken, data.refreshToken)
      userRequest();
    })
    .catch((err)=>{
      deleteCookie('token');
      deleteCookie('refreshToken');
      dispatch(userRequestErr(err));
    });
  }
}

function userRequestErr(err){
  return {
      type: USER_REQUEST_ERROR,
      err,
  }
}
