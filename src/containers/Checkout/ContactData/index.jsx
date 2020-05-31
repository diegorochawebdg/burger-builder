import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import WithErrorHandler from '../../WithErrorHandler/WithErrorHandler';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-mail',
      },
      value: '',
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'fastest',
            displayValue: 'Fastest',
          },
          {
            value: 'cheapest',
            displayValue: 'cheapest',
          },
        ],
      },
      value: 'fastest',
    },
  });

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
    };

    props.onOrderBurger(order);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setOrderForm(updatedOrderForm);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success">Order</Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div>
      <h4>Enter you contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithErrorHandler(ContactData, Axios));
