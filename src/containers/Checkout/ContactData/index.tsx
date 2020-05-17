import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component<any> {
  state: any = {
    name: '',
    email: '',
    address: {
      street: '',
      postaCode: '',
    },
    loading: false,
  }

  orderHandler = (event: any) => {
    event.preventDefault();

    this.setState({
      loading: true,
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Jubileu",
        address: {
          street: 'Rua dos bobos',
          zipCode: '123345',
          country: 'Tangamandápio',
        },
        email: 'lalala@hahaha.com',
      },
      deliveryMethod: 'fastest',
    }

    Axios.post(
      '/orders.json',
      order,
    )
    .then(() => {
      this.setState({
        loading: false,
      });
      this.props.history.push('/');
    })
    .catch(error => {
      console.log('error => ', error);
      this.setState({
        loading: false,
      })
    });
  }

  render () {
    let form = (
      <form>
          <input type="text" name="name" placeholder="You Name" />
          <input type="text" name="email" placeholder="You Name" />
          <input type="text" name="street" placeholder="You Name" />
          <input type="text" name="postal" placeholder="You Name" />
          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div>
        <h4>Enter you contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
