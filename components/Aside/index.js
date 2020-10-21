import React from 'react';
import Styles from './style.module.css';
import Button from '../Button';

export default function Aside() {
  return (
    <aside className={Styles.container}>
      <h1>Consulta de frequência</h1>
      <form>
        <select name="" id=""></select>
        <select name="" id=""></select>
        <Button>Pesquisar</Button>
      </form>
    </aside>
  );
}
