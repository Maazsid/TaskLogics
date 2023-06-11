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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 7px 10px rgb(0, 0, 0, 0.04)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'hsl(234, 12%, 39%)',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(0 0% 98% / 1)',
        },
      },
    },
  },
};

export const lightTheme = createTheme(themeOptions);
