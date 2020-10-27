import Styled from 'styled-components';
// Pra importar svg tem que instalar e configurar o next-images
import MailIcon from '../../../public/icons/Mail.svg';
import PasswordIcon from '../../../public/icons/Password.svg';

const Container = Styled.div`
  width: auto;
  height: 100vh;
  background-color: #DCDCDD;
  display: flex;
  justify-content: center;
  align-items: center;

  form{
    width: 500px;
    height: 550px;
    background-color: #252422;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
      width: 400px;
      text-align: center;
      margin: 20px 0;
      color: #1985A1;
    }
  }
`

export const InputBlock = Styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  &:nth-child(3){
    margin-bottom: 50px;
  }

  label{
    font-size: 22px;
    margin: 10px 0;
    color: #1985A1;
  }
`

export const MailInput = Styled.input`
  height: 40px;
  width: 400px;
  border-radius: 10px;
  color: #1985A1;
  border: none;
  padding: 0 15px;
  background: url(${MailIcon}) no-repeat scroll 10px 10px;
  background-color: #FFFCF2;
  padding-left: 50px;

  ::placeholder{
    color: #1985A1;
  }
`

export const PasswordInput = Styled.input`
  height: 40px;
  width: 400px;
  border-radius: 10px;
  color: #1985A1;
  border: none;
  padding: 0 15px;
  background: url(${PasswordIcon}) no-repeat scroll 10px 6px;
  background-color: #FFFCF2;
  padding-left: 50px;

  ::placeholder{
    color: #1985A1;
  }
`

export default Container;