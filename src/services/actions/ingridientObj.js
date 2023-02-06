import { OPEN_INGRIDIENT } from "../../utils/const";

export function openIngridient(ingridient){
  return {
      type: OPEN_INGRIDIENT,
      ingridient
  }
}
