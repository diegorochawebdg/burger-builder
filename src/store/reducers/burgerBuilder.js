import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}


export default (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.ADD_INGREDIENT:
    const updatedIngredient = {[action.ingredientName]: ++state.ingredients[action.ingredientName]};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    }
    return updateObject(state, updatedState);
  
  case actionTypes.REMOVE_INGREDIENT:
    return { 
      ...state, 
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: --state.ingredients[action.ingredientName],
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };

  case actionTypes.SET_INGREDIENTS:
    return {
      ...state,
      ingredients: action.ingredients,
      error: false,
      totalPrice: 0,
    };
  
  case actionTypes.FETCH_INGREDIENTS_FAILED:
    return {
      ...state,
      error: true,
    };

  default:
    return state
  };
}

