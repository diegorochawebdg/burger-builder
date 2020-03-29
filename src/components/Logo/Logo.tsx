import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.scss';

const Logo = (props: any) => {
  return (
    <div 
      className={classes.Logo}
      style={{height: props.height}}>
      <img alt="Burger logo" src={burgerLogo} />
    </div>
  )
}

export default Logo
