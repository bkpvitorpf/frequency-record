import React, { useEffect, useState } from 'react';
import Api from '../../services/api';

interface Matter{
  id: string
  identifier: string
  name: string
}

const TeacherMattersSelect: React.FC<any> = ({onChange,schoolClass}) => {
  const [matters,setMatters] = useState<Array<Matter> | undefined>();

  useEffect(() => {
    async function fetchData(){
      const {data} = await Api.post('/data/matters',{
        classId: schoolClass
      });

      if(data) setMatters(data.matters);
    }  

    fetchData();
  },[schoolClass]);

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

export default TeacherMattersSelect;