import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../../contexts/auth/useAuthContext';

const AuthRouter = () => {
  //const token = localStorage.getItem('token');
  const { auth } = useAuthContext();
  return auth.isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthRouter;
