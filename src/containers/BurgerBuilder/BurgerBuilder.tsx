import React, { Component, Fragment } from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import IBurgerState, { IBurgerBuilderIngredient } from '../../interfaces/IBurgerBuilder.interface';
import { Ingredients } from '../../interfaces/IBurgerIngredient.interface';

const INGREDIENT_PRICES: IBurgerBuilderIngredient = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state: IBurgerState = {
    ingredients: {
      'salad': 1,
      'bacon': 0,
      'cheese': 0,
      'meat': 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchase(ingredients: IBurgerBuilderIngredient) {
    const sum = Object.keys(ingredients)
      .map((igKey: Ingredients) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0,
    })
  }
  
  addIngredientHandler = (type: Ingredients) => {
    const updatedCount: number = this.state.ingredients[type] + 1;
    const updatedIngredients: IBurgerBuilderIngredient = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddiction: number = INGREDIENT_PRICES[type];
    const oldPrice: number = this.state.totalPrice;
    const newPrice: number = oldPrice + priceAddiction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchase(updatedIngredients);
  }

  removeIngredientHandler = (type: Ingredients) => {
    const oldCount: number = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const updatedCount: number = oldCount - 1;
    const updatedIngredients: IBurgerBuilderIngredient = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction: number = INGREDIENT_PRICES[type];
    const oldPrice: number = this.state.totalPrice;
    const newPrice: number = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchase(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    })
  }
  
  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo: { [ingredient: string]: boolean } = {}; //inline interface
    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    }

    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burger 
          ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler} 
          ingredientRemoved={this.removeIngredientHandler} 
          disabled={disabledInfo}
          price={this.state.totalPrice} 
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable} /> 
      </Fragment>
    )
  }
}

export default BurgerBuilder;