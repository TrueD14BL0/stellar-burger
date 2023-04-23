import { ADD_INGRIDIENT_TO_CONSTRUCTOR, DEL_INGRIDIENT_FROM_CONSTRUCTOR, SWAP_INGRIDIENT_IN_CONSTRUCTOR } from "../../utils/const";
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from "../types/types";

export interface IAddIngridientToConstructor{
  readonly type: typeof ADD_INGRIDIENT_TO_CONSTRUCTOR;
  ingredient: TIngredient;
}

export interface IDelIngridientFromConstructor{
  readonly type: typeof DEL_INGRIDIENT_FROM_CONSTRUCTOR;
  index: number;
  ingredient: TIngredient;
}

export interface ISwapIngridient{
  readonly type: typeof SWAP_INGRIDIENT_IN_CONSTRUCTOR;
  readonly firstEl: number;
  readonly secondEl: number;
}

export const addIngridientToConstructor = (ingredient: TIngredient): IAddIngridientToConstructor => {
  const uuid = uuidv4();
  return {
      type: ADD_INGRIDIENT_TO_CONSTRUCTOR,
      ingredient: {
        ...ingredient,
        key: uuid,
      }
  }
}

export const delIngridientFromConstructor = (ingredient: TIngredient, index: number): IDelIngridientFromConstructor => {
  return {
      type: DEL_INGRIDIENT_FROM_CONSTRUCTOR,
      index,
      ingredient,
  }
}

export const swapIngridient = (firstEl: number, secondEl: number): ISwapIngridient => {
  return {
      type: SWAP_INGRIDIENT_IN_CONSTRUCTOR,
      firstEl,
      secondEl,
  }
}

export type TConstructorListActions = IAddIngridientToConstructor|IDelIngridientFromConstructor|ISwapIngridient;
