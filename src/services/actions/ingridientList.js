import { ADD_INGRIDIENTS_LIST, DECRIMENT_INGRIDIENT_COUNT, INCRIMENT_INGRIDIENT_COUNT } from "../../utils/const";

export function addIngridients(ingridientList){
  return {
      type: ADD_INGRIDIENTS_LIST,
      ingridientList
  }
}

export function incrimentIngridientCount(ingridient){
  return {
      type: INCRIMENT_INGRIDIENT_COUNT,
      ingridient
  }
}

export function decrimentIngridientCount(ingridient){
  return {
      type: DECRIMENT_INGRIDIENT_COUNT,
      ingridient
  }
}
