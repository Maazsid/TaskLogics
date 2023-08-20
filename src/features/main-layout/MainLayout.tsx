import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useEffect } from 'react';
import { useAuthStore } from 'store/store';

const MainLayout = () => {
  const setNavigateFunction = useAuthStore((state) => state.setNavigateFunction);
  const navigate = useNavigate();

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate, setNavigateFunction]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
