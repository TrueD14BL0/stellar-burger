import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DECRIMENT_INGRIDIENT_COUNT, DEL_INGRIDIENT_FROM_CONSTRUCTOR, INGRIDIENTS_LIST_ERROR, INGRIDIENTS_LIST_REQUEST, INGRIDIENTS_LIST_SUCCESS } from "../../utils/const";

const initialState = {
  loading: false,
  error: false,
  content: [],
};

const ingridientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGRIDIENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true};
    case INGRIDIENTS_LIST_SUCCESS:
      const newArr = []
      action.ingridientList.forEach(element => {
        newArr.push(
          {
            ...element,
            qty: 0
          }
        )
      });
      return {
        ...state,
        error: false,
        loading: false,
        content: newArr,
      }
    case INGRIDIENTS_LIST_ERROR:
      console.log(`Cannot receive ingridients list with error: ${action.err}`);
      return {
        ...initialState,
        error: true,
      }
    case ADD_INGRIDIENT_TO_CONSTRUCTOR:
      const copy = [...state.content];
      copy.forEach(element => {
        if(element._id === action.ingridient._id){
          ++element.qty;
        }
        return;
      });
      return {
        ...state,
        content: copy
      };
    case DEL_INGRIDIENT_FROM_CONSTRUCTOR:
    case DECRIMENT_INGRIDIENT_COUNT:
      const copyArr = [...state.content];
      copyArr.forEach(element => {
        if(element._id === action.ingridient._id){
          --element.qty;
        }
        return;
      });
      return {
        ...state,
        content: copyArr
      };
    default:
      return state;
  }

}

export default ingridientsListReducer;
