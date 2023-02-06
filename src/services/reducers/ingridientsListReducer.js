import { ADD_INGRIDIENTS_LIST } from "../../utils/const";

const initialState = [];

const ingridientsListReducer = (state = initialState, action) => {
  console.log('ingridientsListReducer', action);
  switch (action.type) {
    case ADD_INGRIDIENTS_LIST:
      action.ingridientList.forEach(element => {
        state = [...state,
                element]
      });
      break;
    default:
      return state;
  }
  return state;
}

export default ingridientsListReducer;
