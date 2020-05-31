import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders');
});

const app = (props) => {
  const routes = (
    <Switch>
      <Route path="/checkout" render={(props) => <Checkout {...props} />} />
      <Route path="/orders" render={(props) => <Orders {...props} />} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default app;
