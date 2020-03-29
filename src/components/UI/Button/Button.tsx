import React from 'react'

import classes from './Button.module.scss'

const Button = (props: any) => {
  return (
    <button 
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}>
      {props.children}
    </button>
  )
}

export default Button
