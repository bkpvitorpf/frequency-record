import React, { useContext, useState } from 'react';
import Button from '../Button';
import Styles from './style.module.css';
import AuthContext from '../../contexts/auth';

export default function Signin_page() {
  const {signIn} = useContext(AuthContext);
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  async function handleSignIn(event){
    event.preventDefault();
    signIn(email,password);
  }

  return (
    <div className={Styles.container}>
      <form onSubmit={handleSignIn}>
        <h1>Faça login em nossa plataforma para continuar !</h1>
        <div className={Styles.inputBlock}>
          <label>Email</label>
          <input 
            className={Styles.emailInput} 
            type="email" 
            placeholder="Digite aqui o seu email" 
            required
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div className={Styles.inputBlock}>
          <label>Senha</label>
          <input 
            className={Styles.passwordInput} 
            type="password" 
            required
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <Button>Entrar</Button>
      </form>
    </div>
  );
}