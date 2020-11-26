import React, { useContext, useMemo, useState } from 'react';
import Button from '../../components/Button';
import WarningAnimation from '../../components/WarningAnimation';
import AuthContext from '../../contexts/auth';
import Styles from './styles.module.css';

const Signin: React.FC = ({history}:any) => {
  const {signIn,authenticated,status} = useContext(AuthContext);
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  function handleSignIn(event:React.FormEvent){
    event.preventDefault();
    signIn(email,password);
  }

  if(authenticated) history.push('/dashboard');

  const warningAnimationComponent = useMemo(()=> <WarningAnimation status={status} />,[status]);

  return (
    <div className={Styles.container}>
      { 
        // Verifica o status não é nulo e se é diferente de 200, caso ambas sejam verdadeiras, chama o componente de aviso para mostrar o que aconteceu com a requisição
        status && status !== 200 ? warningAnimationComponent : <> </>
      }
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