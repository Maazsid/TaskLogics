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
import { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { NotificationContext } from 'context/NotificationContext';
import ProtectedRoute from '@features/protected-routes/ProtectedRoute';

const Dashboard = lazy(() => import('@features/dashboard/Dashboard'));
const AboutUs = lazy(() => import('@features/about-us/AboutUs'));

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '*',
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: '/dashboard',
            element: (
              <Suspense fallback={<></>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: '/about',
            element: (
              <Suspense fallback={<></>}>
                <AboutUs />
              </Suspense>
            ),
          },
        ],
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

  const queryClient = useMemo(() => new QueryClient(), []);

  const showNotification: ShowNotification = useCallback((message = '', severity: SeverityType = 'error') => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  }, []);

  const notificationContextValue = useMemo(() => ({ showNotification }), [showNotification]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <NotificationContext.Provider value={notificationContextValue}>
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
