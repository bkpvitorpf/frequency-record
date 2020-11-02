import React from 'react';

// import { Container } from './styles';

const MattersSelect: React.FC<any> = ({matters,onChange}) => {
  return (
    <select 
      name="Matters" 
      id="Matters" 
      onChange={onChange} 
      required 
      defaultValue={""}
    >
      <option value="" disabled>Escolha uma disciplina</option>
      {matters.map((matter:any) => (
        <option key={matter.id} value={matter.identifier}>{matter.name}</option>
      ))}
    </select>
  );
}

export default MattersSelect;