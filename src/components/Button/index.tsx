import React from 'react';
import Styles from './styles.module.css';

export default function Button(props) {
  return (
    <button className={Styles.button} onClick={props.onClick}>{props.children}</button>
  );
}
