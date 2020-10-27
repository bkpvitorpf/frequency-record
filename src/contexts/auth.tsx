import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import Api from '../services/api';

interface AuthContextData{
  signed: boolean,
  token: string,
  user_type: string,
  signIn(email:string,password:string): Promise<void>,
  signOut(): void
}

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider ({children}){
  const [token,setToken] = useState(String);
  const [user_type,setuserType] = useState(String);
  const route = useRouter();

  useEffect(()=>{
    const stored_token = localStorage.getItem('token');
    const stored_user_type = localStorage.getItem('user_type');

    if(stored_token && stored_user_type){
      setToken(stored_token);
      setuserType(stored_user_type);
    }
  });

  async function signIn(email: string,password: string){
    const response = await Api.post('/login',{
      email,
      password,
    });

    setToken(response.data.token);
    setuserType(response.data.user_type);

    localStorage.setItem('token',response.data.token);
    localStorage.setItem('user_type',response.data.user_type);
  }

  function signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    setToken(null);
    setuserType(null);
  }

  return (
    // !!token = Faz uma verificação, se token existir, signed recebe true, caso contrário, signed recebe false
    <AuthContext.Provider value={{signed: !!token,token,user_type,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;