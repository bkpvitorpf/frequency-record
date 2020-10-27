import Styled from 'styled-components';

export const TeacherContainer = Styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #C5C3C6;
  padding: 50px 0;

  h1{
    text-align: center;
    font-size: 32px;
    margin: 20px 0;
    color: #1985A1;
  }

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const StudentContainer = Styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #C5C3C6;
  padding: 50px 0;

  h1{
    text-align: center;
    font-size: 32px;
    margin: 50px 0;
    color: #1985A1;
  }

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`