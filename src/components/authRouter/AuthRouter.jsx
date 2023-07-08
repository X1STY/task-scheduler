import { Navigate, Outlet } from 'react-router-dom';

const AuthRouter = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthRouter;
