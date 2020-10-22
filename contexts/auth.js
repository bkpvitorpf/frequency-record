import {createContext, useEffect, useState} from 'react';
import Api from '../services/api';

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext({
  signed: Boolean,
  user: Object,
  signIn: Promise,
  signOut: Function
});

export function AuthProvider ({children}){
  const [user,setUser] = useState(null);

  useEffect(()=>{
    const signed_user = localStorage.getItem('user');

    if(signed_user){
      setUser(signed_user);
    }
  })

  async function signIn(email,password){
    const response = await Api.post('/login',{
      email,
      password,
    })

    localStorage.setItem('user',JSON.stringify(response.data));
    setUser(response.data);
  }

  function signOut(){
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{signed: !!user,user,signIn,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;