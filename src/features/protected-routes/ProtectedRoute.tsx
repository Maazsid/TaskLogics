import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from 'store/store';

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoute;
