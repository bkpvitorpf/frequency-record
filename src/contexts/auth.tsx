import React, { createContext, useEffect, useState } from 'react';
import History from '../history';
import Api from '../services/api';

interface AuthContextData{
  authenticated: boolean;
  token: string | undefined;
  userType: string | undefined;
  loading: boolean | undefined;
  signIn(email:string,password:string): Promise<void>;
  signOut(): void;
}

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [token,setToken] = useState<string | undefined>();
  const [authenticated,setAuth] = useState(false);
  const [userType,setuserType] = useState<string | undefined>();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('user_type');

    if(storedToken && storedUserType){
      setToken(JSON.parse(storedToken));
      setuserType(JSON.parse(storedUserType));
      setAuth(true);

      Api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  },[token]);

  async function signIn(email: string,password: string){
    const {data} = await Api.post('/login',{
      email,
      password,
    });

    if(data){
      History.push('/dashboard');

      setToken(data.token);
      setuserType(data.user_type);
      setAuth(true);

      localStorage.setItem('token',JSON.stringify(data.token));
      localStorage.setItem('user_type',JSON.stringify(data.user_type));

      Api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  function signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');

    setToken(undefined);
    setuserType(undefined);

    History.push('/');
  }

  return (
    // !!token = Faz uma verificação, se token existir, signed recebe true, caso contrário, signed recebe false
    <AuthContext.Provider value={{authenticated,token,userType,loading,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;