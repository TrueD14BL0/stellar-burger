import { ADD_INGREDIENT_TO_CONSTRUCTOR, DEL_INGREDIENT_FROM_CONSTRUCTOR, SWAP_INGREDIENT_IN_CONSTRUCTOR } from "../../utils/const";
import { TConstructorListActions } from "../actions/constructorList";
import { TIngredient } from "../types/types";

type TConstructorListState = {
  content: TIngredient[],
  bun: TIngredient|null,
}

const initialState: TConstructorListState = {
  content: [],
  bun: null,
};

const constructorListReducer = (state = initialState, action: TConstructorListActions): TConstructorListState => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      const ingridient = action.ingredient;
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
    case DEL_INGREDIENT_FROM_CONSTRUCTOR:
      const copy = [...state.content];
      copy.splice(action.index,1);
      return {
        ...state,
        content: copy
      }
    case SWAP_INGREDIENT_IN_CONSTRUCTOR:
      const copyArr = [...state.content];
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
