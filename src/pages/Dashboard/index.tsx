import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import MattersSelect from '../../components/MattersSelect';
import MonthSelect from '../../components/MonthSelect';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import Styles from './styles.module.css';

interface Matter{
  id: string
  identifier: string
  name: string
}

interface User{
  matters: Array<Matter>;
}

const Dashboard: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [loading,setLoading] = useState(true);
  const [userData,setUserData] = useState({} as User);
  const [month,setMonth] = useState<string | null>(null);
  const [matter,setMatter] = useState<string | null>(null);
  const [course,setCourse] = useState<string | null>(null);
  const [schoolClass,setClass] = useState<string | null>(null);
  const [matterCount,setMatterCount] = useState<number | null>(null);
  const userType = userInfo.type;
  const UserName = userInfo.name;

  async function handleSubmit(event:React.FormEvent){
    event.preventDefault();
    console.log(month,matter);
  }

  useEffect(() => {
    async function fetchData(){
      const {data} = await api.get('/data/matters');

      if(data){
        setUserData(data);
        setMatterCount(data.matters.length)

        if(data.matters.length === 1){
          const currentMatter = data.matters[0];

          setMatter(currentMatter.identifier);
        }

        setLoading(false);
      }
    }

    fetchData();
  },[]);

  if(loading) return <LoadingScreen />

  console.log(matter)
  console.log(matterCount);

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.asideContainer}>
          <h1>Consulta de frequência</h1>
          <form onSubmit={handleSubmit}>
            <MonthSelect onChange={(e:any)=>{setMonth(e.target.value)}}/>
            {userType === 'teacher' ? matterCount === 1 ? <>
              <select name="" id="" required></select>
              <select name="" id="" required></select>
            </> : <MattersSelect onChange={(e:any) => {setMatter(e.target.value)}} matters = {userData.matters} /> : <>
              <MattersSelect onChange={(e:any) => {setMatter(e.target.value)}} matters = {userData.matters} />
            </>}
            <Button>Pesquisar</Button>
          </form>
        </div>
        <div className={Styles.contentContainer}>
          {}
          <h1>Olá</h1>
          <h1>{UserName}</h1>
          <h1>Preencha o formulário para continuar</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;