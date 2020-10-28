import { route } from 'next/dist/next-server/server/router';
import React, { useContext, useEffect, useState } from 'react';
import Aside from '../../components/Aside';
import ErrorScreen from '../../components/ErrorScreen';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import AuthContext from '../../contexts/auth';
import useAxios from '../../hooks/useAxios';
import Styles from './styles.module.css';

interface UserData{
  user_name: string;
  matter: Array<object>[];
}

const Dashboard: React.FC = () => {
  const {signed,token} = useContext(AuthContext);
  const [loading,setLoading] = useState(true);
  const [user_data,setUserData] = useState({} as UserData);

  if(!signed) return <ErrorScreen />

  const { data } = useAxios('/data/matters',{
    headers:{
      authorization: `Bearer ${token}`
    },
  });
  
  useEffect(() => {
    if(data){
      setLoading(false);
      setUserData(data);
    }else{
      
    }
  });

  if(loading) return <LoadingScreen />;

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.asideContainer}>
          <Aside matters={user_data.matter}/>
        </div>
        <div className={Styles.content}>
          <h1>Olá</h1>
          <h1>{user_data.user_name}</h1>
          <h1>Preencha o formulário para continuar</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;