import { Ingredients } from "./IBurgerIngredient.interface";

export default interface IBurgerState {
  ingredients: IBurgerBuilderIngredient;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
}

export type IBurgerBuilderIngredient = {
  [ingredient in Ingredients]: number;
}