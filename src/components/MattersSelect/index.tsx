import React, { useEffect, useState } from 'react';
import Api from '../../services/api';

interface Matter{
  id: string
  identifier: string
  name: string
}

const MattersSelect: React.FC<any> = ({onChange}) => {
  const [matters,setMatters] = useState<Array<Matter> | undefined>();

  useEffect(() => {
    async function fetchData(){
      const {data} = await Api.get('/data/matters');

      if(data){
        setMatters(data.matters);
      }
    }

    fetchData();
  },[]);

  return (
    <select 
      name="Matters" 
      id="Matters" 
      onChange={onChange} 
      required 
      defaultValue={""}
    >
      <option value="" disabled>Escolha uma disciplina</option>
      {matters?.map((matter:any) => (
        <option key={matter.id} value={matter.identifier}>{matter.name}</option>
      ))}
    </select>
  );
}

export default MattersSelect;