import Link from 'next/link';
import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import Styles from './style.module.css';

export default function Header() {
  const {signOut} = useContext(AuthContext);

  return (
    <div className={Styles.container}>
      <div className={Styles.buttonContainer}>
        <Link href="">
          <button>
            <img src="icons/Profile.svg" alt="Dados"/>
            <p>Dados</p>
          </button>
        </Link>
      </div>
      <div className={Styles.buttonContainer}>
        <Link href="/dashboard">
          <button>
            <img src="icons/Home.svg" alt="Início"/>
            <p>Início</p>
          </button>
        </Link>
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