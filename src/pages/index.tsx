import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth';

const Index: React.FC = () => {
  const route = useRouter();
  const {signed} = useContext(AuthContext);
  
  useEffect(()=>{
    if(signed){
      route.push('/dashboard');
    }else{
      route.push('/signIn')
    }
  });
  
  return <></>
}

export default Index;