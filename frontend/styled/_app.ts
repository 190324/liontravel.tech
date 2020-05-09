import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${(props) => props.theme.colors.gray}
  }

  .pointer {
      cursor: pointer;
  }
  
  .primaryColor {
      color: ${(props) => props.theme.colors.primary}
  }
`

export const theme = {
    size: {
        mobileS: '320px',
        mobileM: '375px',
        mobileL: '425px',
        tablet: '768px',
        laptop: '1024px',
        laptopL: '1440px',
        desktop: '2560px',
    },
    colors: {
        primary: '#ff764d',
        secondary: '#ffede8',
        success: '#44b1f6',
        danger: '',
        warning: '',
        info: '#f3fafe',
        gray: '#fbfbfb',
    },
}

export const device = {
    mobileS: `(min-width: ${theme.size.mobileS})`,
    mobileM: `(min-width: ${theme.size.mobileM})`,
    mobileL: `(min-width: ${theme.size.mobileL})`,
    tablet: `(min-width: ${theme.size.tablet})`,
    laptop: `(min-width: ${theme.size.laptop})`,
    laptopL: `(min-width: ${theme.size.laptopL})`,
    desktop: `(min-width: ${theme.size.desktop})`,
    desktopL: `(min-width: ${theme.size.desktop})`,
}
