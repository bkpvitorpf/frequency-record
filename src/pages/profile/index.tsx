import React, { useContext, useEffect, useState } from 'react';
import ErrorScreen from '../../components/ErrorScreen';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import AuthContext from '../../contexts/auth';
import useAxios from '../../hooks/useAxios';
import Styles from './styles.module.css';

const Profile: React.FC = () => {
  const {signed,token} = useContext(AuthContext);
  const [loading,setLoading] = useState(true);
  const [user_data,setUserData] = useState({});

  if(!signed) return <ErrorScreen />

  const { data, error } = useAxios('',{
    headers:{
      authorization: `Bearer ${token}`
    }
  });

  useEffect(() =>{
    if(data){
      setLoading(false);
      setUserData(data);
    }
  });

  if(loading) return <LoadingScreen />;

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <aside className={Styles.asideContainer}>
          <img src="/icons/ProfileImage.svg" alt="Avatar"/>
          <h1>Vitor Pereira Fontes</h1>
          <div className={Styles.userData}>
            <h3>Matrícula:</h3>
            <h3>Curso:</h3>
            <h3>Turma:</h3>
            <h3>Modalidade:</h3>
            <h3>Turno:</h3>
          </div>
        </aside>
        <section className={Styles.contentContainer}>
          <header><h1>Progressão anual das disciplinas</h1></header>
          <div className={Styles.dataContainer}>
            <div className={Styles.dataBackground}>
              <div className={Styles.dataContent}>
                <h4>Administração de sistemas operacionais de rede</h4>
                <h4>78%</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;