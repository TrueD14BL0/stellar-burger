import { ADD_INGRIDIENTS_LIST } from "../../utils/const";

const initialState = [];

const ingridientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGRIDIENTS_LIST:
      action.ingridientList.map(element => {
        if(!state.find(el => el._id === element._id)){
        state = [...state,
                element]
        }
      });
      break;
    default:
      return state;
  }
  return state;
}

export default ingridientsListReducer;
