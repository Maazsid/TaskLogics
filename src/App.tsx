import { Button } from '@mui/material';
import './App.scss';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './material-themes/LightTheme';

function App() {
  return (
    <ThemeProvider theme = {lightTheme}>
      <Button variant = "outlined">Hi</Button>
    </ThemeProvider>  
  );
}

export default App;
