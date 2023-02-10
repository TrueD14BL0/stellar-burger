import Api from "../../components/Api/Api";
import { ORDER_CLEAR, ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../../utils/const"

export function getOrderInfo(constructorList){
  return (dispatch) => {
    dispatch({
      type: ORDER_REQUEST,
    })

    Api.postOrders([constructorList.bun._id,
                    constructorList.bun._id,
                    ...constructorList.content.map(item=>item._id)])
    .then((data)=>{
      if(data.success){
        dispatch(setOrder(data.order));
      }else{
        dispatch(setOrderErr('Some trouble with received data.'))
      }
    })
    .catch((err)=>{
      dispatch(setOrderErr(err))
    });
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
