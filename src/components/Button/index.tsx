import React from 'react';
import Styles from './styles.module.css';

const Button: React.FC<any> = (props) => {
  return (
    <button className={Styles.button} onClick={props.onClick}>{props.children}</button>
  );
}

export default Button;