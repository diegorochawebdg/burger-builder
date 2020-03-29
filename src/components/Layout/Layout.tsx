import React, { Fragment } from 'react';

import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props: any) => (
  <Fragment>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;