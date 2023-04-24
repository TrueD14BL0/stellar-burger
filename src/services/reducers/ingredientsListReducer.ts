import { ADD_INGREDIENT_TO_CONSTRUCTOR, DECRIMENT_INGREDIENT_COUNT, DEL_INGREDIENT_FROM_CONSTRUCTOR, INGREDIENTS_LIST_ERROR, INGREDIENTS_LIST_REQUEST, INGREDIENTS_LIST_SUCCESS } from "../../utils/const";
import { TConstructorListActions } from "../actions/constructorList";
import { TIngredientListActions } from "../actions/ingridientList";
import { TIngredient } from "../types/types";

type TIngredientListState = {
  loading: boolean,
  error: boolean,
  content: TIngredient[],
};

const initialState: TIngredientListState = {
  loading: false,
  error: false,
  content: [],
};

const ingridientsListReducer = (state = initialState, action: TConstructorListActions|TIngredientListActions): TIngredientListState => {
  switch (action.type) {
    case INGREDIENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true};
    case INGREDIENTS_LIST_SUCCESS:
      const newArr: TIngredient[] = action.ingredientList.map(element => ({
          ...element,
          qty: 0
        })
      );
      return {
        ...state,
        error: false,
        loading: false,
        content: newArr,
      }
    case INGREDIENTS_LIST_ERROR:
      console.log(`Cannot receive ingridients list with error: ${action.err}`);
      return {
        ...initialState,
        error: true,
      }
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      const copy: TIngredient[] = [...state.content];
      copy.forEach(element => {
        if(element._id === action.ingredient._id){
          ++element.qty;
        }
        return;
      });
      return {
        ...state,
        content: copy
      };
    case DEL_INGREDIENT_FROM_CONSTRUCTOR:
    case DECRIMENT_INGREDIENT_COUNT:
      const copyArr: TIngredient[] = [...state.content];
      copyArr.forEach(element => {
        if(element._id === action.ingredient._id){
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
