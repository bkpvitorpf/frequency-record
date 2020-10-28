import Axios from 'axios';
import Router from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Api from '../services/api';

interface AuthContextData{
  signed: boolean,
  token: string,
  userType: string,
  signIn(email:string,password:string): Promise<void>,
  signOut(): void
}

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider ({children}){
  const [token,setToken] = useState<string>();
  const [userType,setuserType] = useState<string>();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const stored_token = JSON.parse(localStorage.getItem('token'));
    const stored_user_type = JSON.parse(localStorage.getItem('user_type'));

    if(stored_token && stored_user_type){
      setToken(stored_token);
      setuserType(stored_user_type);
    }

    setLoading(false);
  },[]);

  async function signIn(email: string,password: string){
    const {data} = await Api.post('/login',{
      email,
      password,
    });

    if(data){
      setToken(data.token);
      setuserType(data.user_type);

      localStorage.setItem('token',JSON.stringify(data.token));
      localStorage.setItem('user_type',JSON.stringify(data.user_type));

      setLoading(false);
    }
  }

  function signOut(){
    localStorage.clear();
    Router.push('/');
  }

  if(loading) return <></>

  return (
    // !!token = Faz uma verificação, se token existir, signed recebe true, caso contrário, signed recebe false
    <AuthContext.Provider value={{signed: !!token,token,userType,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;