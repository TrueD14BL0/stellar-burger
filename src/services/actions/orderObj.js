import Api from "../../components/Api/Api";
import { ORDER_CLEAR, ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../../utils/const"
import { deleteCookie, getCookie, setTokenCookies } from "../../utils/utils";

export function getOrderInfo(constructorList){
  return (dispatch) => {
    dispatch({
      type: ORDER_REQUEST,
    })

    function refreshToken(){
      return (dispatch) => {
        Api.getAccessToken(getCookie('refreshToken'))
        .then((data)=>{
          setTokenCookies(data.accessToken, data.refreshToken)
          dispatch(getOrderInfo(constructorList));
        })
        .catch((err)=>{
          deleteCookie('token');
          deleteCookie('refreshToken');
          dispatch(setOrderErr(err));
        });
      }
    }

    if(getCookie('token')){
      Api.postOrders([
          constructorList.bun._id,
          ...constructorList.content.map(item=>item._id),
          constructorList.bun._id,
        ], getCookie('token'))
        .then((data)=>{
          if(data.success){
            dispatch(setOrder(data.order));
          }else{
            dispatch(setOrderErr('Some trouble with received data.'))
          }
        })
        .catch((err)=>{
          if(err===401||err===403){
            dispatch(refreshToken());
          }else{
            dispatch(setOrderErr(err));
          }
        }
      );
    }else{
      dispatch(refreshToken());
    }
  }
}

export function setOrder(order){
  return {
      type: ORDER_SUCCESS,
      order,
  }
}

export function setOrderErr(err){
  return {
      type: ORDER_ERROR,
      err,
  }
}

export function clearOrder(){
  return {
      type: ORDER_CLEAR,
  }
}
