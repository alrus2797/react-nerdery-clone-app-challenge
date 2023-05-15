import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    border: 0;
    color: white;
    font-family: 'Circular Std', sans-serif;
    min-height: 600px;
    min-width: 600px;
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    height: 100%;
    line-height: 1.6;
  }

  #root {
    height: 100vh;
    position: relative;

  }
`;

export default GlobalStyle;
