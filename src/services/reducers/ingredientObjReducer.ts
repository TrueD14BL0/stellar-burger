import { CLOSE_INGREDIENT, OPEN_INGREDIENT } from "../../utils/const";
import { TIngredientObjActions } from "../actions/ingridientObj";
import { TIngredient } from "../types/types";

type TIngredientObjState = {
  ingredient: TIngredient|null,
};

const initialState: TIngredientObjState = {
  ingredient: null
};

export const ingredientObjReducer = (state = initialState, action: TIngredientObjActions): TIngredientObjState => {
  switch (action.type) {
    case OPEN_INGREDIENT:
      return {ingredient: action.ingredient};
    case CLOSE_INGREDIENT:
      return initialState;
    default:
      return state;
  }
}

export default ingredientObjReducer;
