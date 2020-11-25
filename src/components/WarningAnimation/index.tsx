import React, { useState } from 'react';
import Styles from './styles.module.css';
import Styled, { keyframes } from "styled-components";
import WarningIcon from '../../assets/icons/Warning.svg';
import CloseIcon from '../../assets/icons/Close.svg';

const WarningAnimation: React.FC<any> = ({status}) => {
  const [display,setDisplay] = useState('flex');

  const boxAnimation = keyframes`
    from{
      top: -150px;
    }
    to{
      top: 60px;
    }
  `

  const Container = Styled.div`
    width: 400px;
    height: 100px;
    background-color: #252422;
    border-radius: 25px;
    margin: 10px 0;
    display: ${display};
    justify-content: center;
    align-items: center;
    padding: 0;
    position: absolute;
    top: -150px;
    animation-name: ${boxAnimation};
    animation-duration: 1.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    border: 2px solid white;
  `

  return (
    <Container>
      <button className={Styles.closeButton} onClick={() => setDisplay('none')}>
        <img src={CloseIcon} alt=""/>
      </button>
      
      <div className={Styles.content}>
        <img src={WarningIcon} alt=""/>
        {status === 404 ? <p>O email informado está incorreto, por favor insira o email novamente !</p> : <p>A senha informada está incorreta, por favor insira a senha novamente !</p>}
      </div>
    </Container>
  );
}

export default WarningAnimation;
