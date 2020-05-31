/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../WithErrorHandler/WithErrorHandler';
import * as actions from './../../store/actions';

const Orders = (props) => {
  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithErrorHandler(Orders, Axios));
