import React, { useContext, useState } from 'react';
import Button from '../Button';
import { Container, InputBlock, MailInput, PasswordInput } from './styles';
import AuthContext from '../../contexts/auth';

const Signin_page: React.FC = () => {
  const {signIn} = useContext(AuthContext);
  const [email,setEmail] = useState<string>();
  const [password,setPassword] = useState<string>();

  async function handleSignIn(event){
    event.preventDefault();
    signIn(email,password);
  }

  return (
    <Container>
      <form onSubmit={handleSignIn}>
        <h1>Faça login em nossa plataforma para continuar !</h1>
        <InputBlock>
          <label>Email</label>
          <MailInput
            type="email" 
            placeholder="Digite aqui o seu email" 
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBlock>
        <InputBlock>
          <label>Senha</label>
          <PasswordInput 
            type="password" 
            required
            onChange={(e)=> setPassword(e.target.value)}
          />
        </InputBlock>
        <Button>Entrar</Button>
      </form>
    </Container>
  );
}

export default Signin_page;