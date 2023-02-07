import { CLOSE_INGRIDIENT, OPEN_INGRIDIENT } from "../../utils/const";

const initialState = {
  _id: "",
  name: "",
  type: "",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
}

export const ingridientObjReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGRIDIENT:
      state = action.ingridient;
      break;
    case CLOSE_INGRIDIENT:
      state = initialState;
    break;
    default:
      return state;
  }
  return state;
}

export default ingridientObjReducer;
