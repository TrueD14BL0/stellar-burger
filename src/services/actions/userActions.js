import { CLEAR_USER, SET_USER } from "../../utils/const";

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
