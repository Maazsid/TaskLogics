import { lightTheme } from './material-themes/LightTheme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './features/layout/MainLayout';
import AboutUs from './features/about-us/AboutUs';
import Dashboard from './features/dashboard/Dashboard';
import './App.scss';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path='/'
              element={<Navigate to='/dashboard' replace />}
            ></Route>
            <Route path='dashboard' element={<Dashboard />}></Route>
            <Route path='about' element={<AboutUs />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
