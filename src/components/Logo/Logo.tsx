import React from 'react';
import { NavLink } from 'react-router-dom';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.scss';

const Logo = (props: any) => {
  return (
    <div 
      className={classes.Logo}
      style={{height: props.height}}>
        <NavLink to="/"><img alt="Burger logo" src={burgerLogo} /></NavLink>
    </div>
  )
}

export default Logo
