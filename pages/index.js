import React,{useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import Signin_page from '../components/Signin_page';
import AuthContext from '../contexts/auth';

export default function Index() {
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