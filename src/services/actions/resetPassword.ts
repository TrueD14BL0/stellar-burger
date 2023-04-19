import Api from "../../components/Api/Api";
import { PASSWORD_RESET_ERROR, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS } from "../../utils/const";

export function resetPasswordAction(resetData){
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
    .catch((err)=>{
      dispatch(resetPasswordErr(err))
    });
  }
}

export function resetPasswordSuccess(){
  return {
      type: PASSWORD_RESET_SUCCESS,
  }
}

export function resetPasswordErr(err){
  return {
      type: PASSWORD_RESET_ERROR,
      err,
  }
}
