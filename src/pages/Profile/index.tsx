import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Avatar from '../../assets/icons/Avatar.svg';
import Header from '../../components/Header';
import LoadingAnimation from '../../components/LoadingAnimation';
import AuthContext from '../../contexts/auth';
import Api from '../../services/api';
import Styles from './styles.module.css';

interface FrequencyData{
  name: string;
  percentFrequency: number;
  schoolClass: string;
  mode: string;
  course: string;
}

const Profile: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [userFrequency,setUserFrequency] = useState<Array<FrequencyData> | null>(null);

  useEffect(() =>{
    async function fetchData(){
      const {data} = await Api.get('/data/user/frequency');

      if(data) setUserFrequency(data);
    }

    fetchData();
  },[]);

  return (
    <>
      <Helmet>
        <title>Perfil</title>
      </Helmet>
      <Header />
      <div className={Styles.container}>
        <aside className={Styles.asideContainer}>
          <img src={Avatar} alt="Avatar"/>
          <h1>{userInfo.name}</h1>
          <div className={Styles.userData}>
            {userInfo.type === 'teacher' ? <>
              <div className={Styles.infoContainer}>
                <h3>Disciplinas: {userInfo.matters.map((matter,index) =>(
                  index !== userInfo.matters.length - 1 ? matter.name + ", " : matter.name
                ))}.</h3>
              </div>
              <div className={Styles.infoContainer}>
                <h3>Modalidades de ensino: {userInfo.modes.map((mode,index) =>(index !== userInfo.modes.length - 1 ? mode.name + ", " : mode.name
                ))}.</h3>
              </div>
              <div className={Styles.infoContainer}>
                <h3>Cursos: {userInfo.courses.map((course,index) =>(index !== userInfo.courses.length - 1 ? course.name + ", " : course.name
                ))}.</h3>
              </div>
              <div className={Styles.infoContainer}>
                <h3>Turmas: {userInfo.classes.map((schoolClass,index) =>(index !== userInfo.classes.length - 1 ? schoolClass.name + ", " : schoolClass.name
                ))}.</h3>
              </div>
            </> : <>
              <h3>Matrícula: {userInfo.registration}</h3>
              <h3>Curso: {userInfo.course}</h3>
              <h3>Turma: {userInfo.schoolClass}</h3>
              <h3>Modalidade: {userInfo.mode}</h3>
              <h3>Turno: {userInfo.shift}</h3>
            </>}
          </div>
        </aside>
        <section className={Styles.contentContainer}>
          <header><h1>Progressão anual das disciplinas</h1></header>
          {!userFrequency ? <LoadingAnimation />:
            <div className={Styles.dataContainer}>
              {userInfo.type === 'teacher' ? userFrequency?.map(matter => (
                <>
                  <div className={Styles.matterInfo}>
                    <h3>{matter.course} - {matter.mode}</h3>
                  </div>
                  <div className={Styles.teacherDataBackground} key={matter.name}>
                    <h3>{matter.name}</h3>
                    <div className={Styles.teacherDataContent}>
                      <h4>{matter.schoolClass}</h4>
                      <h4>{matter.percentFrequency}%</h4>
                    </div>
                  </div>
                </>
              )) : userFrequency?.map(matter =>(
                <div className={Styles.dataBackground} key={matter.name}>
                  <div className={Styles.dataContent}>
                    <h4>{matter.name}</h4>
                    <h4>{matter.percentFrequency}%</h4>
                  </div>
                </div>
              ))}
            </div>
          }
        </section>
      </div>
    </>
  );
}

export default Profile;