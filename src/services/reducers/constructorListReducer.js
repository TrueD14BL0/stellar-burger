import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DEL_INGRIDIENT_FROM_CONSTRUCTOR, SWAP_INGRIDIENT_IN_CONSTRUCTOR } from "../../utils/const";

const initialState = {
  content: [],
  bun: null,
};

const constructorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGRIDIENT_TO_CONSTRUCTOR:
      const ingridient = action.ingridient;
      if(ingridient.type==='bun'){
        return {...state,
                  bun: ingridient,
                }
      }else{
        return {...state,
                content: [
                  ...state.content,
                  ingridient,
                ],
              }
      }
    case DEL_INGRIDIENT_FROM_CONSTRUCTOR:
      const copy = state.content;
      copy.splice(action.index,1);
      return {
        ...state,
        content: copy
      }
    case SWAP_INGRIDIENT_IN_CONSTRUCTOR:
      const copyArr = state.content;
      const firstEl = copyArr[action.firstEl.index];
      const secondEl = copyArr[action.secondEl.index];
      copyArr.splice(action.secondEl.index,1,firstEl);
      copyArr.splice(action.firstEl.index,1,secondEl);
      return {
        ...state,
        content: copyArr,
      };
    default:
      return state;
  }
}

export default constructorListReducer;
