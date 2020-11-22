import React, { createContext, useEffect, useState } from 'react';
import History from '../history';
import Api from '../services/api';

interface DataProps{
  name: string;
}

interface UserProps{
  type: string;
  name: string;
  registration: string;
  mode: string;
  modes: Array<DataProps>;
  course: string;
  courses: Array<DataProps>;
  classes: Array<DataProps>;
  schoolClass: string;
  matter: string;
  matters: Array<DataProps>;
  shift: string;
}

interface AuthContextData{
  authenticated: boolean;
  userInfo: UserProps;
  loading: boolean;
  signIn(email:string,password:string): Promise<void>;
  signOut(): void;
}

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [authenticated,setAuthenticated] = useState(false);
  const [userInfo,setUserInfo] = useState<UserProps>({} as UserProps);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    // Verifica se tem informações armazenadas no local storage pra que o usuário não precise fazer login novamente
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');

    if(storedToken && storedUserInfo){
      Api.defaults.headers.Authorization = `Bearer ${JSON.parse(storedToken)}`;

      setUserInfo(JSON.parse(storedUserInfo));
      setAuthenticated(true);

      History.push(History.location);
    }

    setLoading(false);
  },[]);

  async function signIn(email: string,password: string){
    // Seta o loading como true para que apareça a tela de carregamento
    setLoading(true);

    History.push('/dashboard');

    const {data} = await Api.post('/login',{
      email,
      password,
    });

    if(data){
      setAuthenticated(true);

      Api.defaults.headers.Authorization = `Bearer ${data.token}`;

      localStorage.setItem('token',JSON.stringify(data.token));
      localStorage.setItem('userInfo',JSON.stringify(data.userInfo));

      setUserInfo(data.userInfo);
      setLoading(false);
    }
  }

  function signOut(){
    setUserInfo({} as UserProps);
    setAuthenticated(false);

    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');

    History.push('/');
  }

  return (
    <AuthContext.Provider value={{authenticated,userInfo,loading,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;