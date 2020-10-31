import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import AuthContext from '../../contexts/auth';
import Styles from './styles.module.css';

const Signin: React.FC = () => {
  const {signIn} = useContext(AuthContext);
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  function handleSignIn(event:React.FormEvent){
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
            placeholder="Digite aqui sua senha" 
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

export default Signin;