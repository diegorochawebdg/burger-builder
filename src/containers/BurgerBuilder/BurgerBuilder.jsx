import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../WithErrorHandler/WithErrorHandler';
import * as actions from './../../store/actions';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = props.ings[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price.toFixed(2)}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  if (props.ings) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          ordered={purchaseHandler}
          purchasable={updatePurchase(props.ings)}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithErrorHandler(BurgerBuilder, Axios));
