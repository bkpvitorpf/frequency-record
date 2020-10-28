import Router from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
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
    const storedToken = JSON.parse(localStorage.getItem('token'));
    const storedUserType = JSON.parse(localStorage.getItem('user_type'));

    if(storedToken && storedUserType){
      setToken(storedToken);
      setuserType(storedUserType);
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