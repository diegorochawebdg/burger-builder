import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import WithErrorHandler from '../WithErrorHandler/WithErrorHandler';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
  //   Axios.get('https://burguer-builder-react-c9b06.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       this.setState({
  //         ingredients: response.data,
  //       })
  //     })
  //     .catch(error => {
  //       this.setState({
  //         error: true,
  //       })
  //     })
  }

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
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
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = this.props.ings[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.props.ings) {
      orderSummary = <OrderSummary 
        ingredients={this.props.ings} 
        price={this.props.price.toFixed(2)}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger 
            ingredients={this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded} 
            ingredientRemoved={this.props.onIngredientRemoved} 
            disabled={disabledInfo}
            price={this.props.price} 
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchase(this.props.ings)} /> 
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, Axios));