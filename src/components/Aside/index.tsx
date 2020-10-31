import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import Button from '../Button';
import Styles from './styles.module.css';

export default function Aside({matters}:any) {
  const {userInfo} = useContext(AuthContext);
  const [month,setMonth] = useState<string | null>(null);
  const [matter,setMatter] = useState<string | null>(null);
  const userType = userInfo.type;

  async function handleSubmit(event:React.FormEvent){
    event.preventDefault();
    console.log(month,matter);
  }

  return(
    <>
      <div className={Styles.container}>
        <h1>Consulta de frequência</h1>
        <form onSubmit={handleSubmit}>
          <select name="month" id="month" onChange={(e) => {setMonth(e.target.value)}}>
            <option value="" selected disabled>Selecione o mês desejado</option>
            <option value="Janeiro">Janeiro</option>
            <option value="Fevereiro">Fevereiro</option>
            <option value="Marco">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
            <option value="Junho">Junho</option>
            <option value="Julho">Julho</option>
            <option value="Agosto">Agosto</option>
            <option value="Setembro">Setembro</option>
            <option value="Outubro">Outubro</option>
            <option value="Novembro">Novembro</option>
            <option value="Dezembro">Dezembro</option>
          </select>
          {userType === 'teacher' ? <>
              <select name="" id=""></select>
              <select name="" id=""></select>
              <select name="" id=""></select>
            </> : <>
              <select name="Matters" id="Matters" onChange={(e) => {setMatter(e.target.value)}}>
                <option value="" selected disabled>Escolha uma disciplina</option>
                {matters.map((matter:any) => (
                  <option key="" value={matter.identifier}>{matter.name}</option>
                ))}
              </select>
            </>
          }
          <Button>Pesquisar</Button>
        </form>
      </div>
    </>
  );
}
