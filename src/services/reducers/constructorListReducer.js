import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DEL_INGRIDIENT_FROM_CONSTRUCTOR, SWAP_INGRIDIENT_IN_CONSTRUCTOR } from "../../utils/const";

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
    case SWAP_INGRIDIENT_IN_CONSTRUCTOR:
      if(action.firstEl.index>action.secondEl.index){
        const firstEl = state.content[action.firstEl.index];
        const secondEl = state.content[action.secondEl.index];
        state.content.splice(action.secondEl.index,1,firstEl);
        state.content.splice(action.firstEl.index,1,secondEl);
      }else{
        const firstEl = state.content[action.firstEl.index];
        const secondEl = state.content[action.secondEl.index];
        state.content.splice(action.firstEl.index,1,secondEl);
        state.content.splice(action.secondEl.index,1,firstEl);
      }
      state = {...state};
      break;
    default:
      return state;
  }
  return state;
}

export default constructorListReducer;
