import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0967d3',
    },
    secondary: {
      main: '#1CD4D4',
    },
  },

  typography: {
    subtitle1: {
      fontFamily: 'Open Sans',
    },
    subtitle2: {
      fontFamily: 'Open Sans',
    },
    body1: {
      fontFamily: 'Open Sans',
    },
    body2: {
      fontFamily: 'Open Sans',
    },
    caption: {
      fontFamily: 'Open Sans',
    },
    overline: {
      fontFamily: 'Open Sans',
    },
  },
};

export const materialTheme = createTheme(themeOptions);
