import React from 'react'

import classes from './NavigationItem.module.scss'

const NavigationItem = (props: any) => {
  return (
    <li className={classes.NavigationItem}>
      <a 
        href={props.link} 
        className={props.active ? classes.active : undefined}>
        {props.children}
      </a>
    </li>
  )
}

export default NavigationItem
