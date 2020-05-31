import React, { Fragment, useState } from 'react';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.scss';

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Fragment>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <Sidedrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
