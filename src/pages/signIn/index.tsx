import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import AuthContext from '../../contexts/auth';
import Styles from './styles.module.css';

const Signin_page: React.FC = () => {
  const route = useRouter();
  const {signIn} = useContext(AuthContext);
  const [email,setEmail] = useState<string>();
  const [password,setPassword] = useState<string>();

  function handleSignIn(event){
    event.preventDefault();
    signIn(email,password);
    route.push('/dashboard');
  }

  return (
    <div className={Styles.container}>
      <form onSubmit={handleSignIn}>
        <h1>Faça login em nossa plataforma para continuar !</h1>
        <div className={Styles.inputContainer}>
          <label>Email</label>
          <input
            className={Styles.mailInput}
            type="email" 
            placeholder="Digite aqui o seu email" 
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={Styles.inputContainer}>
          <label>Senha</label>
          <input 
            className={Styles.passwordInput}
            type="password" 
            required
            onChange={(e)=> setPassword(e.target.value)}
            placeholder='Digite aqui a sua senha'
          />
        </div>
        <Button>Entrar</Button>
      </form>
    </div>
  );
}

export default Signin_page;