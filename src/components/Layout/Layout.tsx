import React, { Fragment } from 'react';

import classes from './Layout.module.scss';

const layout = (props: any) => (
  <Fragment>
    <div>Toolbar, SideDrawer, backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;