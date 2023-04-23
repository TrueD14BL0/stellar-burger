import { CLOSE_INGREDIENT, OPEN_INGREDIENT } from "../../utils/const";
import { TIngredient } from "../types/types";

export interface IOpenIngredient{
  readonly type: typeof OPEN_INGREDIENT;
  ingredient: TIngredient;
}

export interface ICloseIngredient{
  readonly type: typeof CLOSE_INGREDIENT;
}

export const openIngridient = (ingredient: TIngredient): IOpenIngredient => {
  return {
      type: OPEN_INGREDIENT,
      ingredient
  }
}

export const closeIngridient = (): ICloseIngredient => {
  return {
      type: CLOSE_INGREDIENT,
  }
}

export type TIngredientObjActions = IOpenIngredient|ICloseIngredient;
