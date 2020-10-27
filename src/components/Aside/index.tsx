import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import Button from '../Button';
import MonthSelect from '../MonthSelect';
import TeacherContainer,{StudentContainer, Title} from './styles';

export default function Aside({matters}) {
  const {user_type} = useContext(AuthContext);

  if(user_type == 'teacher'){
    return (<>
      <TeacherContainer>
        <h1 className="title">Consulta de frequência</h1>
        <form>
          <MonthSelect/>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <select name="" id=""></select>
          <Button>Pesquisar</Button>
        </form>
      </TeacherContainer>
    </>);
  }else{
    return (<>
      <StudentContainer>
        <h1 className="title">Consulta de frequência</h1>
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
      </StudentContainer>
    </>);
  }
}
