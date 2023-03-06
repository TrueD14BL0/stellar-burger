import Api from "../../components/Api/Api";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../utils/const";

export function loginAction(loginData){
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
    .catch((err)=>{
      dispatch(loginErr(err))
    });
  }
}

export function loginSuccess(user, token, refreshToken){
  return {
      type: LOGIN_SUCCESS,
      user,
      token,
      refreshToken,
  }
}

export function loginErr(err){
  return {
      type: LOGIN_ERROR,
      err,
  }
}
