import { ADD_INGREDIENT_TO_CONSTRUCTOR, DEL_INGREDIENT_FROM_CONSTRUCTOR, SWAP_INGREDIENT_IN_CONSTRUCTOR } from "../../utils/const";
import { v4 as uuidv4 } from 'uuid';
import { TDNDObj, TIngredient } from "../types/types";

export interface IAddIngridientToConstructor{
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  ingredient: TIngredient;
}

export interface IDelIngridientFromConstructor{
  readonly type: typeof DEL_INGREDIENT_FROM_CONSTRUCTOR;
  index: number;
  ingredient: TIngredient;
}

export interface ISwapIngridient{
  readonly type: typeof SWAP_INGREDIENT_IN_CONSTRUCTOR;
  readonly firstEl: TDNDObj;
  readonly secondEl: TDNDObj;
}

export const addIngridientToConstructor = (ingredient: TIngredient): IAddIngridientToConstructor => {
  const uuid: string = uuidv4();
  return {
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      ingredient: {
        ...ingredient,
        key: uuid,
      }
  }
}

export const delIngridientFromConstructor = (ingredient: TIngredient, index: number): IDelIngridientFromConstructor => {
  return {
      type: DEL_INGREDIENT_FROM_CONSTRUCTOR,
      index,
      ingredient,
  }
}

export const swapIngridient = (firstEl: TDNDObj, secondEl: TDNDObj): ISwapIngridient => {
  return {
      type: SWAP_INGREDIENT_IN_CONSTRUCTOR,
      firstEl,
      secondEl,
  }
}

export type TConstructorListActions = IAddIngridientToConstructor|IDelIngridientFromConstructor|ISwapIngridient;
