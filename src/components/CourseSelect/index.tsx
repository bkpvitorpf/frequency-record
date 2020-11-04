import React, { useEffect, useState } from 'react';
import Api from '../../services/api';

interface Course{
  id: string
  name: string
}

const CourseSelect: React.FC<any> = ({onChange,mode}) => {
  const [courses,setCourses] = useState<Array<Course> | undefined>();

  useEffect(() => {
    async function fetchData(){
      const {data} = await Api.post('/data/courses',{
        modeId: mode
      });

      if(data){
        setCourses(data.courses);
      }
    }

    fetchData();
  },[mode]);

  return (
    <select 
      name="Modes" 
      id="Modes" 
      onChange={onChange} 
      required 
      defaultValue={""}
    >
      <option value="" disabled>Escolha um curso</option>
      {courses?.map((course:any) => (
        <option key={course.id} value={course.id}>{course.name}</option>
      ))}
    </select>
  );
}

export default CourseSelect;