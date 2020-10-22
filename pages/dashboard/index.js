import React,{useContext, useEffect, useState} from 'react';
import AuthContext from '../../contexts/auth';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Styles from './styles.module.css';
import {useRouter} from 'next/router';

function dashboard() {
  const {signed,user,signOut} = useContext(AuthContext);
  const route = useRouter();

  useEffect(()=>{
    if(!signed){
      route.push('/');
    }
  })

  const user_data = JSON.parse(user);

  return (
    <>
      {!signed && <></>}
      {signed && <>
        <Header />
        <div className={Styles.container}>
          <div className={Styles.aside}><Aside /></div>
          <div className={Styles.content}>
            <h1>{user_data.name}</h1>
          </div>
        </div>
      </>}
    </>
  );
}

export default dashboard;