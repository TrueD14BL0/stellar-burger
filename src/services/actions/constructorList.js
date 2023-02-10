import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DEL_INGRIDIENT_FROM_CONSTRUCTOR, SWAP_INGRIDIENT_IN_CONSTRUCTOR } from "../../utils/const";
import { v4 as uuidv4 } from 'uuid';

export function addIngridientToConstructor(ingridient){
  const uuid = uuidv4();
  return {
      type: ADD_INGRIDIENT_TO_CONSTRUCTOR,
      ingridient: {
        ...ingridient,
        key: uuid,
      }
  }
}

export function delIngridientFromConstructor(ingridient, index){
  return {
      type: DEL_INGRIDIENT_FROM_CONSTRUCTOR,
      index,
      ingridient,
  }
}

export function swapIngridient(firstEl, secondEl){
  return {
      type: SWAP_INGRIDIENT_IN_CONSTRUCTOR,
      firstEl,
      secondEl,
  }
}
