import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import CourseSelect from '../../components/CourseSelect';
import Header from '../../components/Header';
import MattersSelect from '../../components/MattersSelect';
import ModesSelect from '../../components/ModeSelect';
import MonthSelect from '../../components/MonthSelect';
import AuthContext from '../../contexts/auth';
import Styles from './styles.module.css';

const Dashboard: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [month,setMonth] = useState<string | null>(null);
  const [matter,setMatter] = useState<string | null>(null);
  const [mode,setMode] = useState<string | null>(null);
  const [course,setCourse] = useState<string | null>(null);
  const [schoolClass,setClass] = useState<string | null>(null);
  const userType = userInfo.type;
  const UserName = userInfo.name;

  async function handleSubmit(event:React.FormEvent){
    event.preventDefault();
    console.log(month,matter);
  }

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.asideContainer}>
          <h1>Consulta de frequência</h1>
          <form onSubmit={handleSubmit}>
            <MonthSelect onChange={(e:any)=>{setMonth(e.target.value)}}/>
            {userType === 'teacher' && <>
              <ModesSelect onChange={(e:any)=>{setMode(e.target.value)}}/>
              <CourseSelect mode={mode}/>
              <select name="" id="" required></select>
            </>}
            <MattersSelect onChange={(e:any) => {setMatter(e.target.value)}}/>
            <Button>Pesquisar</Button>
          </form>
        </div>
        <div className={Styles.contentContainer}>
          <h1>Olá</h1>
          <h1>{UserName}</h1>
          <h1>Preencha o formulário para continuar</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;