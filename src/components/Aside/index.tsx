import React, { useContext, useEffect } from 'react';
import {useRouter} from 'next/router';
import Api from '../../services/api';
import AuthContext from '../../contexts/auth';
import Styles from './style.module.css';
import Button from '../Button';
import MonthSelect from '../MonthSelect';

export default function Aside(props) {
  const route = useRouter();
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
          {props.matters.map(matter => (
            <option value={matter.identifier}>{matter.name}</option>
          ))}
        </select>
        <Button>Pesquisar</Button>
      </form>
      </aside>
    );
  }
}
