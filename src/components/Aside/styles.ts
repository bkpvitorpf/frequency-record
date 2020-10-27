import Styled from 'styled-components';
import SelectArrowDown from "../../../public/icons/SelectArrowDown.svg";
import SelectArrowUp from "../../../public/icons/SelectArrowUp.svg";

const TeacherContainer = Styled.aside`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #C5C3C6;
  padding: 50px 0;

  h1.title{
    text-align: center;
    font-size: 36px;
    margin: 50px 0;
    color: #1985A1;
  }

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  select{
    color: #1985A1;
    margin: 20px 0;
    padding: 0 10px;
    padding-right: 50px;
    width: 250px;
    height: 40px;
    background: url(${SelectArrowDown}) no-repeat scroll 215px 7px;
    background-color: #FFFCF2;
    border: none;
    border-radius: 10px;
    -webkit-appearance: none;

    option{
      color:#1985A1;
    }

    &:nth-child(4){
      margin-bottom: 60px;
    }
  }

  select:active{
    background: url(${SelectArrowUp}) no-repeat scroll 215px 7px;
    background-color: #FFFCF2;
  }
`
export default TeacherContainer;

export const StudentContainer = Styled.aside`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #C5C3C6;
  padding: 50px 0;

  h1.title{
    text-align: center;
    font-size: 36px;
    margin: 50px 0;
    color: #1985A1;
  }

  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  select{
    color:#1985A1;
    margin: 20px 0;
    padding: 0 10px;
    padding-right: 50px;
    width: 250px;
    height: 40px;
    background: url(${SelectArrowDown}) no-repeat scroll 215px 7px;
    background-color: #FFFCF2;
    border: none;
    border-radius: 10px;
    -webkit-appearance: none;

    &:nth-child(2){
      margin-bottom: 60px;
    }

    option{
      color:#1985A1;
    }
  }

  select:active{
    background: url(${SelectArrowUp}) no-repeat scroll 215px 7px;
    background-color: #FFFCF2;
  }
`
export const Title = Styled.h1`
  text-align: center;
  font-size: 32px;
  margin: 50px 0;
  color: #1985A1;
`