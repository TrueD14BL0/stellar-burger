import { ADD_INGREDIENT_TO_CONSTRUCTOR, DEL_INGREDIENT_FROM_CONSTRUCTOR, SWAP_INGREDIENT_IN_CONSTRUCTOR } from "../../utils/const";
import { v4 as uuidv4 } from 'uuid';
import { TDNDObj, TIngredient } from "../types/types";

export interface IAddIngredientToConstructor{
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  ingredient: TIngredient;
}

export interface IDelIngredientFromConstructor{
  readonly type: typeof DEL_INGREDIENT_FROM_CONSTRUCTOR;
  index: number;
  ingredient: TIngredient;
}

export interface ISwapIngredient{
  readonly type: typeof SWAP_INGREDIENT_IN_CONSTRUCTOR;
  readonly firstEl: TDNDObj;
  readonly secondEl: TDNDObj;
}

export const addIngredientToConstructor = (ingredient: TIngredient): IAddIngredientToConstructor => {
  const uuid: string = uuidv4();
  return {
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      ingredient: {
        ...ingredient,
        key: uuid,
      }
  }
}

export const delIngredientFromConstructor = (ingredient: TIngredient, index: number): IDelIngredientFromConstructor => {
  return {
      type: DEL_INGREDIENT_FROM_CONSTRUCTOR,
      index,
      ingredient,
  }
}

export const swapIngredient = (firstEl: TDNDObj, secondEl: TDNDObj): ISwapIngredient => {
  return {
      type: SWAP_INGREDIENT_IN_CONSTRUCTOR,
      firstEl,
      secondEl,
  }
}

export type TConstructorListActions = IAddIngredientToConstructor|IDelIngredientFromConstructor|ISwapIngredient;
