import React, { useState } from 'react';
import Lottie from 'react-lottie';
import History from '../../history';
import { defaultErrorOptions } from '../../config/animationConfig';
import Styles from './styles.module.css';

const ErrorScreen: React.FC = () => {
  // eslint-disable-next-line
  const [animation_state,setAnimationState] = useState({
    isStopped: false, isPaused: false
  });
  
  return (
    <div className={Styles.container}>
      <Lottie options={defaultErrorOptions}
        height= {300}
        width= {300}
        isStopped={animation_state.isStopped}
        isPaused={animation_state.isPaused}
        isClickToPauseDisabled={true}
      />
      <div className={Styles.warning}>
        <h2>OOOPPS!</h2>
        <p>Parece que você não tem autorização para acessar essa página, faça o login e tente novamente.</p>
      </div>
      <button className={Styles.button} onClick={()=> History.push('/')}>
        Ir para a tela de login
      </button>
      <div className={Styles.info}>
        <h4>Available in</h4>
        <a href="https://lottiefiles.com" rel="noopener noreferrer" target="_blank">Lottie Files</a>
      </div>
    </div>
  );
}

export default ErrorScreen;