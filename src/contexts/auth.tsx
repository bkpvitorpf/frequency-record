import React, { createContext, useEffect, useState } from 'react';
import History from '../history';
import Api from '../services/api';

interface UserProps{
  type: string;
  name: string;
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
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');

    if(storedToken && storedUserInfo){
      Api.defaults.headers.Authorization = `Bearer ${JSON.parse(storedToken)}`;

      setUserInfo(JSON.parse(storedUserInfo));
      setAuthenticated(true);
    }

    setLoading(false);
  },[]);

  async function signIn(email: string,password: string){
    const {data} = await Api.post('/login',{
      email,
      password,
    });

    if(data){
      Api.defaults.headers.Authorization = `Bearer ${data.token}`;

      localStorage.setItem('token',JSON.stringify(data.token));
      localStorage.setItem('userInfo',JSON.stringify(data.user_info));

      setUserInfo(data.user_info);
      setAuthenticated(true);

      History.push('/dashboard');
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
    // !!token = Faz uma verificação, se token existir, signed recebe true, caso contrário, signed recebe false
    <AuthContext.Provider value={{authenticated,userInfo,loading,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;