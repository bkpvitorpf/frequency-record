import React, { useEffect, useState } from 'react';
import Api from '../../services/api';

interface Modes{
  id: string
  name: string
}

const ModesSelect: React.FC<any> = ({onChange}) => {
  const [modes,setModes] = useState<Array<Modes> | undefined>();

  useEffect(() => {
    async function fetchData(){
      const {data} = await Api.get('/data/matters');

      if(data){
        setModes(data.matters);
      }
    }

    fetchData();
  },[]);

  return (
    <select 
      name="Modes" 
      id="Modes" 
      onChange={onChange} 
      required 
      defaultValue={""}
    >
      <option value="" disabled>Escolha uma modalidade</option>
      {modes?.map((mode:any) => (
        <option key={mode.id} value={mode.id}>{mode.name}</option>
      ))}
    </select>
  );
}

export default ModesSelect;