/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import httpErrorHandler from '../../hooks/http-error-handler';

const WithErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = httpErrorHandler(axios);

    return (
      <Fragment>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default WithErrorHandler;
