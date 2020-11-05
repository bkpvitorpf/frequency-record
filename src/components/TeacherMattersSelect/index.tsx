import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth';
import Api from '../../services/api';

interface Matter{
  id: string
  identifier: string
  name: string
}

const MattersSelect: React.FC<any> = ({onChange,schoolClass}) => {
  const [matters,setMatters] = useState<Array<Matter> | undefined>();
  const {userInfo} = useContext(AuthContext);
  const userType = userInfo.type;

  useEffect(() => {
    async function fetchData(){
      if(userType === 'teacher'){
        const {data} = await Api.post('/data/matters',{
          classId: schoolClass
        });

        console.log(data);

        if(data){
          setMatters(data.matters);
        }
      }else{
        const {data} = await Api.get('/data/matters');

        if(data){
          setMatters(data.matters);
        }
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