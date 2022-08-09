import { materialTheme } from './Theme/MaterialTheme';
import { ThemeProvider } from '@mui/material/styles';
import MainLayout from './features/layout/MainLayout';
import './App.scss';

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <MainLayout>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
