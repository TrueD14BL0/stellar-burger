import { CLOSE_INGRIDIENT, OPEN_INGRIDIENT } from "../../utils/const";

export function openIngridient(ingridient){
  return {
      type: OPEN_INGRIDIENT,
      ingridient
  }
}

export function closeIngridient(){
  return {
      type: CLOSE_INGRIDIENT,
  }
}
