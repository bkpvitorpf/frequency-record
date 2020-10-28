import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { defaultLoadingOptions } from '../../config/animationConfig';
import Styles from './styles.module.css';

const LoadingScreen: React.FC = () => {
  const [animation_state,setAnimationState] = useState({
    isStopped: false, isPaused: false
  });
  
  return (
    <div className={Styles.container}>
      <Lottie options={defaultLoadingOptions}
        height= {400}
        width= {400}
        isStopped={animation_state.isStopped}
        isPaused={animation_state.isPaused}
        isClickToPauseDisabled={true}
      />
      <div className={Styles.info}>
        <h4>Created by</h4>
        <a href="https://lottiefiles.com/zeffchris" target="_blank">Jeffrey Christopher</a>
      </div>
    </div>
  );
}

export default LoadingScreen;