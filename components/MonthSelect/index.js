import React from 'react';

export default function MonthSelect() {
  return (
    <select name="month" id="month">
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
  );
}