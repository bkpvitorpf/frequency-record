import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Styles from './styles.module.css';
import Avatar from '../../assets/icons/Avatar.svg';
import Api from '../../services/api';
import AuthContext from '../../contexts/auth';

interface DataProps{
  name: string;
}

interface UserData{
  matters: Array<DataProps> | undefined;
  courses: Array<DataProps> | undefined;
  classes: Array<DataProps> | undefined;
  registration: string | undefined;
  course: DataProps | undefined;
  mode: DataProps | undefined;
  schoolClass: DataProps | undefined;
  shift: DataProps | undefined;
}

const Profile: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [userData,setUserData] = useState<UserData>({} as UserData);
  const userName = userInfo.name;
  const userType = userInfo.type;

  useEffect(() =>{
    async function fetchData(){
      const {data} = await Api.get('/data/user');

      if(data){
        setUserData(data);
      }
    }

    fetchData();
  },[]);

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <aside className={Styles.asideContainer}>
          <img src={Avatar} alt="Avatar"/>
          <h1>{userName}</h1>
          <div className={Styles.userData}>
            {userType === 'teacher' ? <>
              
            </> : <>
              <h3>Matrícula: {userData.registration}</h3>
              <h3>Curso: {userData.course?.name}</h3>
              <h3>Turma: {userData.schoolClass?.name}</h3>
              <h3>Modalidade: {userData.mode?.name}</h3>
              <h3>Turno: {userData.shift?.name}</h3>
            </>}
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