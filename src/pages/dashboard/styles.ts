import Styled from 'styled-components'

export const HeaderContainer = Styled.div`
  width: 20px;
`

const Container = Styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 90.8vh;
  
  .asideContainer{
    grid-column-start: 1;
    grid-row-start: 1;
  }

  div{
    grid-column-start: 2;
    grid-row-start: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #DCDCDD;

    h1{
      font-size: 50px;
      color: #4C5C68;

      &:nth-child(2){
        margin: 20px 0;
      }

      &:nth-child(3){
        margin: 20px 0;
        width: 600px;
      }
    }
  }
`

export default Container;
