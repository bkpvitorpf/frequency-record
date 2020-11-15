import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Styles from './styles.module.css';
import Avatar from '../../assets/icons/Avatar.svg';
import Api from '../../services/api';
import AuthContext from '../../contexts/auth';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingAnimation from '../../components/LoadingAnimation';

interface DataProps{
  name: string;
}

interface UserData{
  matters: Array<DataProps>;
  courses: Array<DataProps>;
  classes: Array<DataProps>;
  registration: string;
  course: DataProps;
  mode: DataProps;
  schoolClass: DataProps;
  shift: DataProps;
}

interface FrequencyData{
  name: string | undefined;
  percentFrequency: number | undefined;
  schoolClass: string | undefined;
  mode: string | undefined;
  course: string | undefined;
}

const Profile: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [userData,setUserData] = useState<UserData | null>(null);
  const [userFrequency,setUserFrequency] = useState<Array<FrequencyData> | null>(null);
  const [loading,setLoading] = useState(true);
  const userName = userInfo.name;
  const userType = userInfo.type;

  useEffect(() =>{
    async function fetchData(){
      const {data} = await Api.get('/data/user');
      
      if(data){
        setUserData(data);
        setLoading(false);
      }

      const {data:frequency} = await Api.get('/data/user/frequency');

      if(frequency){
        setUserFrequency(frequency);
        console.log(frequency);
      }
    }

    fetchData();
  },[]);

  if(loading) return <LoadingScreen />

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <aside className={Styles.asideContainer}>
          <img src={Avatar} alt="Avatar"/>
          <h1>{userName}</h1>
          <div className={Styles.userData}>
            {userType === 'teacher' ? <>
              
            </> : /*O ? depois da variável significa "se existir" */<>
              <h3>Matrícula: {userData?.registration}</h3>
              <h3>Curso: {userData?.course.name}</h3>
              <h3>Turma: {userData?.schoolClass.name}</h3>
              <h3>Modalidade: {userData?.mode.name}</h3>
              <h3>Turno: {userData?.shift.name}</h3>
            </>}
          </div>
        </aside>
        <section className={Styles.contentContainer}>
          <header><h1>Progressão anual das disciplinas</h1></header>
          {!userFrequency ? <LoadingAnimation />:
            <div className={Styles.dataContainer}>
              {userType === 'teacher' ? userFrequency?.map(matter => (
                <>
                  <div className={Styles.infoContent}>
                    <h3>{matter.course} - {matter.mode}</h3>
                  </div>
                  <div className={Styles.dataBackground} key={matter.name}>
                    <h3>{matter.name}</h3>
                    <div className={Styles.dataContent}>
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