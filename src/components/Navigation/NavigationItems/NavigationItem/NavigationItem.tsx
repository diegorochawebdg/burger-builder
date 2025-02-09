import React from 'react'

import classes from './NavigationItem.module.scss'
import { NavLink } from 'react-router-dom'

const NavigationItem = (props: any) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink 
        to={props.link}
        exact
        activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavigationItem
