import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import Button from '../Button';
import MonthSelect from '../MonthSelect';
import Styles from './style.module.css';

export default function Aside({matters}) {
  const {user_type} = useContext(AuthContext);

  if(user_type == 'teacher'){
    return (
      <aside className={Styles.teacherContainer}>
      <h1>Consulta de frequência</h1>
      <form>
        <MonthSelect/>
        <select name="" id=""></select>
        <select name="" id=""></select>
        <select name="" id=""></select>
        <Button>Pesquisar</Button>
      </form>
      </aside>
    );
  }else{
    return (
      <aside className={Styles.studentContainer}>
      <h1>Consulta de frequência</h1>
      <form>
        <MonthSelect />
        <select name="Matters" id="Matters">
          <option value="" selected disabled>Escolha uma disciplina</option>
          {matters.map(matter => (
            <option value={matter.identifier}>{matter.name}</option>
          ))}
        </select>
        <Button>Pesquisar</Button>
      </form>
      </aside>
    );
  }
}
