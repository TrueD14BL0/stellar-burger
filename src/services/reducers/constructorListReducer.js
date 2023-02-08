import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DEL_INGRIDIENT_FROM_CONSTRUCTOR } from "../../utils/const";

const initialState = {
  content: [],
  bun: null,
  sum: 0,
};

const constructorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGRIDIENT_TO_CONSTRUCTOR:
      const ingridient = action.ingridient;
      if(ingridient.type==='bun'){
        state = {...state,
                  sum: state.sum + ingridient.price*2 - (state.bun?state.bun.price*2:0),
                  bun: ingridient,
                }
      }else{
        state = {...state,
                sum: state.sum + ingridient.price,
                content: [...state.content,
                          ingridient,],}
      }
      break;
    case DEL_INGRIDIENT_FROM_CONSTRUCTOR:
      const delEl = state.content[action.index];
      state.content.splice(action.index,1);
      state = {...state,
              sum: state.sum - delEl.price,
              }
      break;
    default:
      return state;
  }
  return state;
}

export default constructorListReducer;
