import { ADD_INGRIDIENT } from "../../utils/const";

export function addIngridient(text){
  return {
      type: ADD_INGRIDIENT,
      text
  }
}
