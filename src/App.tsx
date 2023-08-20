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
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import ProtectedRoute from '@features/protected-routes/ProtectedRoute';
import { useAuthStore, useNotificationStore } from 'store/store';
import { shallow } from 'zustand/shallow';
import { getAccessToken } from 'api/auth/auth-api';
import AuthProtectedRoute from '@features/protected-routes/AuthProtectedRoute';

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
    element: <AuthProtectedRoute />,
    children: [
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
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const refreshTokenTimeoutId = useRef(0);

  const queryClient = useMemo(() => new QueryClient(), []);

  const { setIsLoggedIn, setAccessToken, isRefreshTokenIntervalOn, setIsRefreshTokenIntervalOn } =
    useAuthStore(
      (state) => ({
        setIsLoggedIn: state.setIsLoggedIn,
        setAccessToken: state.setAccessToken,
        isRefreshTokenIntervalOn: state.isRefreshTokenIntervalOn,
        setIsRefreshTokenIntervalOn: state.setIsRefreshTokenIntervalOn,
      }),
      shallow
    );

  useEffect(() => {
    if (isMounted.current) return;

    setIsLoading(true);

    const fetchAccessToken = async () => {
      try {
        const res = await getAccessToken();
        setIsLoggedIn(true);
        setAccessToken(res?.accessToken);
        setIsRefreshTokenIntervalOn(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchAccessToken();

    isMounted.current = true;
  }, [setAccessToken, setIsLoggedIn, setIsRefreshTokenIntervalOn]);

  useEffect(() => {
    const startRefreshTokenInterval = () => {
      const timeoutTime = 1000 * 60 * 15;

      refreshTokenTimeoutId.current = setTimeout(() => {
        const fetchAccessToken = async () => {
          const res = await getAccessToken();
          setAccessToken(res?.accessToken);
          startRefreshTokenInterval();
        };

        fetchAccessToken();
      }, timeoutTime);
    };

    if (isRefreshTokenIntervalOn) {
      startRefreshTokenInterval();
    } else {
      clearTimeout(refreshTokenTimeoutId.current);
    }

    return () => clearTimeout(refreshTokenTimeoutId.current);
  }, [setAccessToken, isRefreshTokenIntervalOn]);

  const { open, severity, message, setOpen } = useNotificationStore(
    (state) => ({
      open: state.open,
      severity: state.severity,
      message: state.message,
      setOpen: state.setOpen,
    }),
    shallow
  );

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        {!isLoading && (
          <>
            {' '}
            <RouterProvider router={router} />
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
          </>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

type SeverityType = 'success' | 'error' | 'warning' | 'info';

export type ShowNotification = (message: string, severity?: SeverityType) => void;
