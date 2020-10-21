import React from 'react';
import Styles from './style.module.css';
import Link from 'next/link';

export default function Header() {
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
        <Link href="/inicio">
          <button>
            <img src="icons/Home.svg" alt="Início"/>
            <p>Início</p>
          </button>
        </Link>
      </div>
      <div className={Styles.buttonContainer}>
        <button>
          <img src="icons/Logout.svg" alt="Sair"/>
          <p>Sair</p>
        </button>
      </div>
    </div>
  );
}