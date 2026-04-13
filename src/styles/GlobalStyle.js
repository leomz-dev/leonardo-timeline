import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.colors.body};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Custom Scrollbar for sleekness */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.background};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.border};
      border-radius: 4px;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  p, span, input, button, textarea {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;
