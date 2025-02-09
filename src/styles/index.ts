import styled, { createGlobalStyle } from 'styled-components'
import variables from './variables'

const GlobalStyle = createGlobalStyle`
*{
margin:0;
padding: 0;
box-sizing: border-box;
font-family: Roboto, sans-serif;
list-style: none;
text-decoration: none;
}
`

export const Container = styled.div`
  display: Grid;
  grid-template-columns: 224px auto;
`

export const MainContainer = styled.main`
  padding: 0 40px;
  height: 100vh;
  overflow-y: scroll;
`

export const Title = styled.h2`
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
`
export const InputGlobal = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
  border: 1px solid #666666;
  color: #666666;
  font-size: 14px;
`
export const Button = styled.button`
  padding: 8px 12px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  border: none;
  cursor: pointer;
  background-color: ${variables.greyBg};
  border-radius: 8px;
  margin-right: 8px;
`

export const ButtonSave = styled(Button)`
  background-color: ${variables.green};
`

export default GlobalStyle
