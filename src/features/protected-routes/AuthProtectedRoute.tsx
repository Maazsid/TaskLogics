import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from 'store/store';

const AuthProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return <>{!isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />}</>;
};

export default AuthProtectedRoute;
