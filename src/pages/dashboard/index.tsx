import React, { useContext, useEffect, useState } from 'react';
import Aside from '../../components/Aside';
import ErrorScreen from '../../components/ErrorScreen';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import AuthContext from '../../contexts/auth';
import useAxios from '../../hooks/useAxios';
import Api from '../../services/api';
import Styles from './styles.module.css';

interface UserData{
  user_name: string;
  matter: Array<object>[];
}

const Dashboard: React.FC = () => {
  const {signed,token} = useContext(AuthContext);
  const [user_token,setUserToken] = useState<string>();
  const [loading,setLoading] = useState(true);
  const [user_data,setUserData] = useState({} as UserData);

  const Authorization = 'Bearer ' + token;

  const { data, error } = useAxios('/data/matters',{
    headers:{
      Authorization
    }
  });

  useEffect(() =>{
    if(data){
      setLoading(false);
      setUserData(data);
    }
    const teste = localStorage.getItem('token');
    console.log(teste)
  });

  if(!signed) return <ErrorScreen />

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