import React from 'react';
import Button from '../Button';
import Styles from './style.module.css';

export default function Login_page() {
  return (
    <div className={Styles.container}>
      <form>
        <h1>Faça login em nossa plataforma para continuar !</h1>
        <div className={Styles.inputBlock}>
          <label>Email</label>
          <input className={Styles.emailInput} type="email" placeholder="Digite aqui o seu email"/>
        </div>
        <div className={Styles.inputBlock}>
          <label>Senha</label>
          <input className={Styles.passwordInput} type="password"/>
        </div>
        <Button>Entrar</Button>
      </form>
    </div>
  );
}
