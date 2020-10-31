import React, { useContext, useEffect, useState } from 'react';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import Styles from './styles.module.css';

interface UserData{
  matters: Array<object>;
}

const Dashboard: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [loading,setLoading] = useState(true);
  const [userData,setUserData] = useState({} as UserData);
  const name = userInfo.name;

  useEffect(() => {
    async function fetchData(){
      const {data} = await api.get('/data/matters');

      if(data){
        setUserData(data);
        setLoading(false);
      }
    }

    fetchData();
  },[]);

  if(loading) return <LoadingScreen />

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.asideContainer}>
          <Aside matters={userData.matters}/>
        </div>
        <div className={Styles.content}>
          <h1>Olá</h1>
          <h1>{name}</h1>
          <h1>Preencha o formulário para continuar</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;