import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary'

class Checkout extends Component<any> {
  state = {
    ingredients: {},
  }
  componentDidMount() {
    const query: any = new URLSearchParams(this.props.location.search);
    const ingredients: any = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients,
    })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients} 
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
      </div>
    )
  }
}

export default Checkout;