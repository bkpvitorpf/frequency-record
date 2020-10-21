import React from 'react';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Styles from './style.module.css';

export default function Inicio() {
  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.aside}>
          <Aside/>
        </div>
      </div>
    </>
  );
}