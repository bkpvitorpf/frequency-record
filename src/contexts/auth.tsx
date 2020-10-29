import React, { createContext, useEffect, useState } from 'react';
import History from '../history';
import Api from '../services/api';

interface AuthContextData{
  authenticated: boolean;
  userType: string | undefined;
  loading: boolean;
  signIn(email:string,password:string): Promise<void>;
  signOut(): void;
}

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [authenticated,setAuth] = useState(false);
  const [userType,setuserType] = useState<string | undefined>();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('user_type');

    if(storedToken && storedUserType){
      setuserType(JSON.parse(storedUserType));
      setAuth(true);

      Api.defaults.headers.Authorization = `Bearer ${JSON.parse(storedToken)}`;
    }

    setLoading(false);
  },[]);

  async function signIn(email: string,password: string){
    const {data} = await Api.post('/login',{
      email,
      password,
    });

    if(data){
      setuserType(data.user_type);
      setAuth(true);

      Api.defaults.headers.Authorization = `Bearer ${data.token}`;

      localStorage.setItem('token',JSON.stringify(data.token));
      localStorage.setItem('user_type',JSON.stringify(data.user_type));

      //History.push('/dashboard');
    }
  }

  function signOut(){
    setuserType(undefined);

    localStorage.removeItem('token');
    localStorage.removeItem('user_type');

    History.push('/');
  }

  return (
    // !!token = Faz uma verificação, se token existir, signed recebe true, caso contrário, signed recebe false
    <AuthContext.Provider value={{authenticated,userType,loading,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;