import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@material-themes/LightTheme';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@features/main-layout/MainLayout';
import Login from '@features/auth/login/Login';
import './App.scss';
import Register from '@features/auth/register/Register';
import AuthLayout from '@features/main-layout/auth-layout/AuthLayout';
import VerifyOtp from '@features/auth/verify-otp/VerifyOtp';
import ForgotPassword from '@features/auth/forgot-password/ForgotPassword';
import ResetPassword from '@features/auth/reset-password/ResetPassword';

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
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <Register />,
        path: '/register',
      },
      {
        element: <VerifyOtp />,
        path: '/verify-otp',
      },
      {
        element: <ForgotPassword />,
        path: '/forgot-password',
      },
      {
        element: <ResetPassword />,
        path: '/reset-password',
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
