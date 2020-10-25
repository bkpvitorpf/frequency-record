import React from 'react';
import Styles from './style.module.css';

export default function Button(props) {
  return (
    <button className={Styles.button}>{props.children}</button>
  );
}
