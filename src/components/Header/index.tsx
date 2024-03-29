import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import Styles from './style.module.css';
import History from '../../history';
import ProfileImage from '../../assets/icons/Profile.svg';
import HomeImage from '../../assets/icons/Home.svg';
import LogoutImage from '../../assets/icons/Logout.svg';

export default function Header() {
  const {signOut} = useContext(AuthContext);

  return (
    <div className={Styles.container}>
      <div className={Styles.buttonContainer}>
        <button onClick={()=> History.push('/profile')}>
          <img src={ProfileImage} alt="Perfil" />
          <p>Dados</p>
        </button>
      </div>
      <div className={Styles.buttonContainer}>
        <button onClick={()=> History.push('/dashboard')}>
          <img src={HomeImage} alt="Início" className={Styles.home}/>
          <p>Início</p>
        </button>
      </div>
      <div className={Styles.buttonContainer}>
        <button onClick={signOut}>
          <img src={LogoutImage} alt="Sair"/>
          <p>Sair</p>
        </button>
      </div>
    </div>
  );
}