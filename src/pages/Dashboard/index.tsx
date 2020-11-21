import React, { useContext, useMemo, useState } from 'react';
import { Helmet } from "react-helmet";
import Button from '../../components/Button';
import ClassesSelect from '../../components/ClassesSelect';
import CourseSelect from '../../components/CourseSelect';
import Header from '../../components/Header';
import MattersSelect from '../../components/MattersSelect';
import ModesSelect from '../../components/ModeSelect';
import MonthSelect from '../../components/MonthSelect';
import TeacherMattersSelect from '../../components/TeacherMattersSelect';
import UserFrequencyData from '../../components/UserFrequencyData';
import AuthContext from '../../contexts/auth';
import Api from '../../services/api';
import Styles from './styles.module.css';

const Dashboard: React.FC = () => {
  const {userInfo} = useContext(AuthContext);
  const [month,setMonth] = useState<string | null>(null);
  const [matterIdentifier,setMatterIdentifier] = useState<string | null>(null);
  const [modeId,setModeId] = useState<string | null>(null);
  const [courseId,setCourseId] = useState<string | null>(null);
  const [classId,setClassId] = useState<string | null>(null);
  const [frequencyData,setFrequencyData] = useState<string | null>(null);
  const [formSubmitted,setFormSubmitted] = useState<boolean>(false);

  async function handleSubmit(event:React.FormEvent){
    event.preventDefault();
    // Setando os dados de frequência como nulo pra que quando o componente UserFrequencyData for chamado, a animação de loading apareça
    setFrequencyData(null);
    setFormSubmitted(true);

    if(userInfo.type === 'teacher'){
      const {data} = await Api.post('/data/frequency',{
        month,
        matterIdentifier,
        modeId,
        courseId,
        classId
      });

      if(data) setFrequencyData(data);
    }else{
      const {data} = await Api.post('/data/frequency',{
        month,
        matterIdentifier
      });

      if(data) setFrequencyData(data);
    }
  }

  // Usando o useMemo eu informo pro react que o componente UserFrequencyData só deve ser renderizado novamente caso haja uma mudança na variável frequencyData
  const userFrequencyDataComponent = useMemo(()=> <UserFrequencyData frequencyData = {frequencyData} />,[frequencyData]);

  return (
    <>
      <Helmet>
        <title>Início</title>
      </Helmet>
      <Header />
      <div className={Styles.container}>
        <div className={Styles.asideContainer}>
          <h1>Consulta de frequência</h1>
          <form onSubmit={handleSubmit}>
            <MonthSelect onChange={(e:any)=>{setMonth(e.target.value)}}/>
            {userInfo.type === 'teacher' && <>
              <ModesSelect onChange={(e:any)=>{setModeId(e.target.value)}}/>
              <CourseSelect onChange={(e:any)=>{setCourseId(e.target.value)}} mode={modeId}/>
              <ClassesSelect onChange={(e:any)=>{setClassId(e.target.value)}} course={courseId} />
              <TeacherMattersSelect onChange={(e:any) => {setMatterIdentifier(e.target.value)}} schoolClass={classId} />
            </>}
            {userInfo.type === 'student' && <>
              <MattersSelect onChange={(e:any) => {setMatterIdentifier(e.target.value)}}/>
            </>}
            <Button>Pesquisar</Button>
          </form>
        </div>
        <div className={Styles.contentContainer}>
          {formSubmitted ? userFrequencyDataComponent : <>
            <h1>Olá</h1>
            <h1>{userInfo.name}</h1>
            <h1>Preencha o formulário para continuar</h1>
          </>}
        </div>
      </div>
    </>
  );
}

export default Dashboard;