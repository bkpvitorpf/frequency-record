import React, { useEffect, useState } from 'react';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import useAxios from '../../hooks/useAxios';
import Styles from './styles.module.css';

interface UserData{
  user_name: string;
  matter: Array<object>[];
}

const Dashboard: React.FC = () => {
  const [loading,setLoading] = useState(true);
  const [userData,setUserData] = useState({} as UserData);

  const { data } = useAxios('/data/matters');
  
  useEffect(() => {
    if(data){
      setLoading(false);
      setUserData(data);
    }
  },[data]);

  if(loading) return <LoadingScreen />

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.asideContainer}>
          <Aside matters={userData.matter}/>
        </div>
        <div className={Styles.content}>
          <h1>Olá</h1>
          <h1>{userData.user_name}</h1>
          <h1>Preencha o formulário para continuar</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;