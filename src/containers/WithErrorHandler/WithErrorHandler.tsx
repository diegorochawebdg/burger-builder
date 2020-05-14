import { Fragment, Component } from 'react';
import React from 'react';

import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent: any, axios: any) => {
  return class extends Component<any> {
    state = {
      error: null as any,
    }

    reqInterceptor: any;
    resInterceptor: any;

    constructor(props: any) {
      super(props);
      
      this.reqInterceptor = axios.interceptors.request.use((req: any) => {
        this.setState({
          error: null,
        });
        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(null, (Error: any) => {
        this.setState({
          error: Error,
        });
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler() {
      this.setState({
        error: null,
      })
    }

    render() {
      return (
        <Fragment>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
}

export default WithErrorHandler