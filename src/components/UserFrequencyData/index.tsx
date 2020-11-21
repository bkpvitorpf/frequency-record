import React, { useContext } from 'react';
import Styled, { keyframes } from "styled-components";
import LoadingAnimation from '../../components/LoadingAnimation';
import AuthContext from '../../contexts/auth';
import Styles from './styles.module.css';

interface IFrequencyData{
  matterName: string;
  teacher: string;
  month: string;
  monthlyAttendedClasses: number;
  monthlyClasses: number;
  monthlyRemainingClasses: number;
  percentFrequency: number;
  anualRemainingClasses: number;
}

const UserFrequencyData: React.FC<any> = ({frequencyData}) => {
  const {userInfo} = useContext(AuthContext);
  const userFrequencyData: IFrequencyData = frequencyData;

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
              <h3>Restam {userFrequencyData.monthlyRemainingClasses} aulas de {userFrequencyData.matterName} em {userFrequencyData.month} e {userFrequencyData.anualRemainingClasses} em 2020</h3>
            </div>
          </>}
        </div>
      : <LoadingAnimation />}
    </>
  );
}

export default UserFrequencyData;