import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import Button from '../Button';
import MonthSelect from '../MonthSelect';
import Styles from './styles.module.css';

export default function Aside({matters}:any) {
  const {userType} = useContext(AuthContext);

  if(userType === 'teacher'){
    return (<>
      <div className={Styles.teacherContainer}>
        <h1 className="title">Consulta de frequência</h1>
        <form>
          <MonthSelect/>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <Button>Pesquisar</Button>
        </form>
      </div>
    </>);
  }else{
    return (<>
      <div className={Styles.studentContainer}>
        <h1 className="title">Consulta de frequência</h1>
        <form>
          <MonthSelect />
          <select name="Matters" id="Matters">
            <option value="" selected disabled>Escolha uma disciplina</option>
            {matters.map((matter:any) => (
              <option key="" value={matter.identifier}>{matter.name}</option>
            ))}
          </select>
          <Button>Pesquisar</Button>
        </form>
      </div>
    </>);
  }
}
