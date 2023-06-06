import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@material-themes/LightTheme';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@features/layout/MainLayout';
import Dashboard from '@features/dashboard/Dashboard';
import AboutUs from '@features/about-us/AboutUs';
import './App.scss';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
