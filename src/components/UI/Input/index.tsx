import React from 'react';
import classes from './Input.module.scss';

const Input= (props: any) => {
  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />
    break;
    
    case ('textarea'):
      inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />
    break;
    
    case ('select'):
      inputElement = (
        <select
          className={classes.InputElement} onChange={props.changed}>
            {props.elementConfig.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
        </select>
      );
    break;

    default:
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />
    break;
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
