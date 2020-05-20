import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.ADD_INGREDIENT:
    return { 
      ...state, 
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: ++state.ingredients[action.ingredientName],
      }
    };
  
  case actionTypes.REMOVE_INGREDIENT:
    return { 
      ...state, 
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: --state.ingredients[action.ingredientName],
      }
    };

  default:
    return state
  }
}

