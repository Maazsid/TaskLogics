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
import { QueryClient, QueryClientProvider } from 'react-query';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { NotificationContext } from 'context/notificationContext';

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SeverityType>('error');

  const queryClient = new QueryClient();

  const showNotification: ShowNotification = (message = '', severity: SeverityType = 'error') => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <NotificationContext.Provider value={{ showNotification }}>
          <RouterProvider router={router} />
        </NotificationContext.Provider>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          disableWindowBlurListener={true}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
            {message}
          </Alert>
        </Snackbar>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

type SeverityType = 'success' | 'error' | 'warning' | 'info';

export type ShowNotification = (message: string, severity?: SeverityType) => void;
