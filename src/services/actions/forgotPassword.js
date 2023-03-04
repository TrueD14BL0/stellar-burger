import Api from "../../components/Api/Api";
import { PASSWORD_FORGOT_ERROR, PASSWORD_FORGOT_REQUEST, PASSWORD_FORGOT_SUCCESS } from "../../utils/const";

export function forgotPasswordAction(email){
  return (dispatch) => {
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
    .catch((err)=>{
      dispatch(forgotPasswordErr(err))
    });
  }
}

export function forgotPasswordSuccess(){
  return {
      type: PASSWORD_FORGOT_SUCCESS,
  }
}

export function forgotPasswordErr(err){
  return {
      type: PASSWORD_FORGOT_ERROR,
      err,
  }
}
