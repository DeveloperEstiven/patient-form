import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.body}; 
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.colors.font}
  }
`
