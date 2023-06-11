import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@material-themes/LightTheme';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@features/main-layout/MainLayout';
import Login from '@features/auth/login/Login';
import './App.scss';
import Register from '@features/auth/register/Register';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        lazy: async () => {
          const { Dashboard } = await import('@features/dashboard/Dashboard');
          return {
            Component: Dashboard,
          };
        },
      },
      {
        path: '/about',
        lazy: async () => {
          const { AboutUs } = await import('@features/about-us/AboutUs');
          return {
            Component: AboutUs,
          };
        },
      },
    ],
  },
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <Register />,
    path: '/register',
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
