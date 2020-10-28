import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import Styles from './style.module.css';

import ProfileImage from '../../assets/icons/Profile.svg';

export default function Header({history}:any) {
  const {signOut} = useContext(AuthContext);

  return (
    <div className={Styles.container}>
      <div className={Styles.buttonContainer}>
        <button onClick={()=> history.push('/profile')}>
          <img src={ProfileImage} alt="Perfil"/>
          <p>Dados</p>
        </button>
      </div>
      <div className={Styles.buttonContainer}>
        <button onClick={()=> history.push('/dashboard')}>
          <img src="icons/Home.svg" alt="Início"/>
          <p>Início</p>
        </button>
      </div>
      <div className={Styles.buttonContainer}>
        <button onClick={signOut}>
          <img src="icons/Logout.svg" alt="Sair"/>
          <p>Sair</p>
        </button>
      </div>
    </div>
  );
}