import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DEL_INGRIDIENT_FROM_CONSTRUCTOR, SWAP_INGRIDIENT_IN_CONSTRUCTOR } from "../../utils/const";

export function addIngridientToConstructor(ingridient){
  return {
      type: ADD_INGRIDIENT_TO_CONSTRUCTOR,
      ingridient
  }
}

export function delIngridientFromConstructor(index){
  return {
      type: DEL_INGRIDIENT_FROM_CONSTRUCTOR,
      index
  }
}

export function swapIngridient(firstEl, secondEl){
  return {
      type: SWAP_INGRIDIENT_IN_CONSTRUCTOR,
      firstEl,
      secondEl,
  }
}
