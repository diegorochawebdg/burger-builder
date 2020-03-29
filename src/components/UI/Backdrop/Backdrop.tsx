import React from 'react'

import classes from './Backdrop.module.scss'

const Backdrop = (props: any) => {
  return (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
  )
}

export default Backdrop