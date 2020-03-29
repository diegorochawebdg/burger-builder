import React, { Fragment } from 'react';

import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

const layout = (props: any) => (
  <Fragment>
    <Toolbar />
    <Sidedrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;