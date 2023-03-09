import Api from "../../components/Api/Api";
import { getCookie } from "../../components/utils/utils";
import { LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../utils/const";

export function logoutAction(){
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    })

    Api.getLogout(getCookie('refreshToken'))
    .then((data)=>{
      if(data.success){
        dispatch(logoutSuccess());
      }else{
        dispatch(logoutErr('Some trouble with received data.'))
      }
    })
    .catch((err)=>{
      dispatch(logoutErr(err))
    });
  }
}

export function logoutSuccess(){
  return {
      type: LOGOUT_SUCCESS,
  }
}

export function logoutErr(err){
  return {
      type: LOGOUT_ERROR,
      err,
  }
}
