import React, { useContext } from 'react';
import Styled, { keyframes } from "styled-components";
import LoadingAnimation from '../../components/LoadingAnimation';
import AuthContext from '../../contexts/auth';
import Styles from './styles.module.css';

interface StudentsFrequency{
  name: string;
  monthlyAttendedClasses: number;
  monthlyClasses: number;
}

interface IFrequencyData{
  matterName: string;
  teacher: string;
  month: string;
  modeName: string;
  courseName: string;
  className: string;
  shift: string;
  monthlyClassesTaught: number;
  monthlyAttendedClasses: number;
  monthlyClasses: number;
  monthlyRemainingClasses: number;
  percentFrequency: number;
  anualRemainingClasses: number;
  studentsList: Array<StudentsFrequency>;
}

const UserFrequencyData: React.FC<any> = ({frequencyData}) => {
  const {userInfo} = useContext(AuthContext);
  const userFrequencyData: IFrequencyData = frequencyData;
  const date = new Date();

  console.log(frequencyData);

  // Animação da barra de progresso da disciplina
  const progressBarAnimation = keyframes`
    from{
      width: 0%;
    }
    to{
    width: ${userFrequencyData?.percentFrequency}%;
    }
  `

  // Estilo da barra de progresso da disciplina
  const ProgressBar = Styled.div`
  position: absolute;
  z-index: 2;
  height: 100%;
  background-color: #1985A1;
  border-radius: 25px;
  animation-name: ${progressBarAnimation};
  animation-duration: 2s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  `;

  return (
    <>
      {userFrequencyData ? 
        <div className={Styles.container}>
          {userInfo.type === 'teacher' ? <>
            <div className={Styles.teacherContainer}>
              <div className={Styles.classData}>
                <h3>{userFrequencyData.modeName}</h3>
                <h3>{userFrequencyData.matterName}</h3>
                <div className={Styles.info}>
                  <div className={Styles.box}>
                    <h3>Turma: {userFrequencyData.className}</h3>
                    <h3>Mês: {userFrequencyData.month}</h3>
                  </div>
                  <div className={Styles.box}>
                    <h3>Curso: {userFrequencyData.courseName}</h3>
                    <h3>Turno: {userFrequencyData.shift}</h3>
                  </div>
                </div>
                <div className={Styles.classInfo}>
                  <div className={Styles.monthlyAttendedClasses}>
                    <h3>Aulas ministradas</h3>
                    <h3>{userFrequencyData.monthlyClassesTaught}</h3>
                  </div>
                  <div className={Styles.monthlyClasses}>
                    <h3>Total de aulas</h3>
                    <h3>{userFrequencyData.monthlyClasses}</h3>
                  </div>
                </div>
                <div className={Styles.progressBarContainer}>
                  <div className={Styles.background}>
                    <ProgressBar/>
                  </div>
                  <h3>{userFrequencyData.percentFrequency} %</h3>
                </div>
                <div className={Styles.generalInfo}>
                  <h3>Restam {userFrequencyData.monthlyRemainingClasses} aulas de {userFrequencyData.matterName} para serem ministradas em {userFrequencyData.month} e {userFrequencyData.anualRemainingClasses} em {date.getFullYear()}</h3>
                </div>
              </div>
              <div className={Styles.studentsList}>
                <div className={Styles.header}>
                  <h3>Frequência mensal da turma</h3>
                </div>
                <div className={Styles.content}>
                  {userFrequencyData.studentsList.map(student=>(
                    <div className={Styles.studentData}>
                      <h3>{student.name}</h3>
                      <h3>{student.monthlyAttendedClasses} / {student.monthlyClasses}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>: <>
            <h3>{userFrequencyData.matterName}</h3>
            <div className={Styles.info}>
              <h3>Professor(a): {userFrequencyData.teacher}</h3>
              <h3>Mês: {userFrequencyData.month}</h3>
            </div>
            <div className={Styles.classInfo}>
              <div className={Styles.monthlyAttendedClasses}>
                <h3>Aulas vistas</h3>
                <h3>{userFrequencyData.monthlyAttendedClasses}</h3>
              </div>
              <div className={Styles.monthlyClasses}>
                <h3>Total de aulas</h3>
                <h3>{userFrequencyData.monthlyClasses}</h3>
              </div>
            </div>
            <div className={Styles.progressBarContainer}>
              <div className={Styles.background}>
                <ProgressBar/>
              </div>
              <h3>{userFrequencyData.percentFrequency} %</h3>
            </div>
            <div className={Styles.generalInfo}>
              <h3>Restam {userFrequencyData.monthlyRemainingClasses} aulas de {userFrequencyData.matterName} em {userFrequencyData.month} e {userFrequencyData.anualRemainingClasses} em {date.getFullYear()}</h3>
            </div>
          </>}
        </div>
      : <LoadingAnimation />}
    </>
  );
}

export default UserFrequencyData;