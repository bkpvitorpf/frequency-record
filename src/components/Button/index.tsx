import React from 'react';
import ButtonElement from './styles';

export default function Button(props) {
  return (
    <ButtonElement onClick={props.onClick}>{props.children}</ButtonElement>
  );
}
