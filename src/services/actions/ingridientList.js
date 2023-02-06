import { ADD_INGRIDIENTS_LIST } from "../../utils/const";

export function addIngridients(ingridientList){
  return {
      type: ADD_INGRIDIENTS_LIST,
      ingridientList
  }
}
