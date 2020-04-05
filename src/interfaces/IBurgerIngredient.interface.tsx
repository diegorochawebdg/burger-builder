export type Ingredients = 'bread-bottom' | 'bread-top' | 'meat' | 'cheese' | 'bacon' | 'salad' | string;

export default interface IBurgerIngredient {
  type: Ingredients;
}