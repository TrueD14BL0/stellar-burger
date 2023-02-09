import { DEL_ORDER, SET_ORDER } from "../../utils/const"

export function setOrder(order){
  return {
      type: SET_ORDER,
      order,
  }
}

export function delOrder(){
  return {
      type: DEL_ORDER,
  }
}
