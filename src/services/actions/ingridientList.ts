import Api from "../../components/Api/Api";
import { DECRIMENT_INGREDIENT_COUNT, INGREDIENTS_LIST_ERROR, INGREDIENTS_LIST_REQUEST, INGREDIENTS_LIST_SUCCESS } from "../../utils/const";
import { AppThunk, TIngredient } from "../types/types";

export interface IDecrimentIngridientCount{
  readonly type: typeof DECRIMENT_INGREDIENT_COUNT;
  ingredient: TIngredient;
}

export interface IIngredientListRequest{
  readonly type: typeof INGREDIENTS_LIST_REQUEST;
}

export interface IIngredientListSuccess{
  readonly type: typeof INGREDIENTS_LIST_SUCCESS;
  ingredientList: TIngredient[];
}

export interface IIngredientListError{
  readonly type: typeof INGREDIENTS_LIST_ERROR;
  err: string;
}

export const getIngridientsList: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: INGREDIENTS_LIST_REQUEST,
    })

    Api.getIngredients()
      .then((data)=>{
        dispatch({
          type: INGREDIENTS_LIST_SUCCESS,
          ingredientList: data.data,
        });
      })
      .catch((err: string)=>{
        dispatch({
          type: INGREDIENTS_LIST_ERROR,
          err,
        });
      });
  }
}

export const decrimentIngridientCount = (ingredient: TIngredient): IDecrimentIngridientCount => {
  return {
      type: DECRIMENT_INGREDIENT_COUNT,
      ingredient
  }
}

export type TIngredientListActions = IDecrimentIngridientCount|IIngredientListRequest|IIngredientListSuccess|IIngredientListError;
