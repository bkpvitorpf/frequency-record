import React,{useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import Signin_page from '../components/Signin_page';
import AuthContext from '../contexts/auth';

const Index: React.FC = () => {
  const route = useRouter();
  const {signed} = useContext(AuthContext);

  useEffect(()=>{
    if(signed){
      route.push('/dashboard');
    }
  });
  
  return (
    <>
      {signed && <></>}
      {!signed && <Signin_page />}
    </>
  )
}

export default Index;