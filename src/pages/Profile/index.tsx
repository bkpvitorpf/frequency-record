import React from 'react';
import Header from '../../components/Header';
import Styles from './styles.module.css';
import Avatar from '../../assets/icons/Avatar.svg';

const Profile: React.FC = () => {
  return (
    <>
      <Header />
      <div className={Styles.container}>
        <aside className={Styles.asideContainer}>
          <img src={Avatar} alt="Avatar"/>
          <h1>Vitor Pereira Fontes</h1>
          <div className={Styles.userData}>
            <h3>Matrícula:</h3>
            <h3>Curso:</h3>
            <h3>Turma:</h3>
            <h3>Modalidade:</h3>
            <h3>Turno:</h3>
          </div>
        </aside>
        <section className={Styles.contentContainer}>
          <header><h1>Progressão anual das disciplinas</h1></header>
          <div className={Styles.dataContainer}>
            <div className={Styles.dataBackground}>
              <div className={Styles.dataContent}>
                <h4>Administração de sistemas operacionais de rede</h4>
                <h4>78%</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;