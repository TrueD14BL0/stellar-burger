import { DECRIMENT_INGRIDIENT_COUNT, INCRIMENT_INGRIDIENT_COUNT, INGRIDIENTS_LIST_ERROR, INGRIDIENTS_LIST_REQUEST, INGRIDIENTS_LIST_SUCCESS } from "../../utils/const";

const initialState = [];

const ingridientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGRIDIENTS_LIST_REQUEST:
      /*вызываем отсутствующий лоадер*/
      break;
    case INGRIDIENTS_LIST_SUCCESS:
      action.ingridientList.forEach(element => {
        if(!state.find(el => el._id === element._id)){
        state = [...state,
                element]
        }
      });
      break;
    case INGRIDIENTS_LIST_ERROR:
      console.log(`Cannot receive ingridients list with error: ${action.err}`);
      state = initialState;
      /*и выкидываем на страницу 5хх - скорее всего у нас проблемы на сервере*/
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
