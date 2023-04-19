import Api from "../../components/Api/Api";
import { USER_REGISTRATION_ERROR, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_REQUEST } from "../../utils/const";

export function registerUser(registrObj){
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
    .catch((err)=>{
      dispatch(registerUserErr(err))
    });
  }
}

export function registerUserSuccess(){
  return {
      type: USER_REGISTRATION_SUCCESS,
  }
}

export function registerUserErr(err){
  return {
      type: USER_REGISTRATION_ERROR,
      err,
  }
}
