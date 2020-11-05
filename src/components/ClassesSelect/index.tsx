import React, { useEffect, useState } from 'react';
import Api from '../../services/api';

interface SchoolClass{
  id: string
  name: string
}

const ClassesSelect: React.FC<any> = ({onChange,course}) => {
  const [classes,setClasses] = useState<Array<SchoolClass> | undefined>();

  useEffect(() => {
    async function fetchData(){
      const {data} = await Api.post('/data/classes',{
        courseId: course
      });

      if(data){
        setClasses(data.classes);
      }
    }

    fetchData();
  },[course]);

  return (
    <select 
      name="Classes" 
      id="Classes" 
      onChange={onChange} 
      required 
      defaultValue={""}
    >
      <option value="" disabled>Escolha a turma/período</option>
      {classes?.map((schoolClass:any) => (
        <option key={schoolClass.id} value={schoolClass.id}>{schoolClass.name}</option>
      ))}
    </select>
  );
}

export default ClassesSelect;