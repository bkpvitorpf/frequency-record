import {createContext, useState} from 'react';

// Criando o contexto e definindo o formato de cada propriedade
const AuthContext = createContext({
  signed: Boolean,
  user: Object,
  signIn: Promise,
  signOut: Function
});

export function AuthProvider ({children}){
  const [signed,setSigned] = useState();
  const [user,setUser] = useState();
  
  async function signIn(email,password){
    console.log(email,password)
    setSigned(true);
  }

  function signOut(){

  }

  return (
    <AuthContext.Provider value={{signed,user,signIn}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;