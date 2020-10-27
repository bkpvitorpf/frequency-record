import Styled from 'styled-components'

const ButtonElement = Styled.button`
  width: 200px;
  height: 50px;
  font-size: 26px;
  color: #FFFCF2;
  background-color: #1985A1;
  border: none;
  border-radius: 10px;

  &:hover{
    cursor: pointer;
    background-color: rgb(17, 109, 134);
  }
`
export default ButtonElement;
