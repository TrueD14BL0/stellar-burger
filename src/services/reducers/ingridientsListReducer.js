import { ADD_INGRIDIENTS_LIST, DECRIMENT_INGRIDIENT_COUNT, INCRIMENT_INGRIDIENT_COUNT } from "../../utils/const";

const initialState = [];

const ingridientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGRIDIENTS_LIST:
      action.ingridientList.forEach(element => {
        if(!state.find(el => el._id === element._id)){
        state = [...state,
                element]
        }
      });
      break;
    case INCRIMENT_INGRIDIENT_COUNT:
      state.map(element => {
        if(element === action.ingridient){
          ++element.__v;
        }
        return element;
      });
      break;
    case DECRIMENT_INGRIDIENT_COUNT:
      state.map(element => {
        if(element === action.ingridient){
          --element.__v;
        }
        return element;
      });
      break;
    default:
      return state;
  }
  return state;
}

export default ingridientsListReducer;
