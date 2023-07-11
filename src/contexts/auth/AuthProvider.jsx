import { useState } from 'react';

import { AuthContext } from './AuthContext.jsx';

export const AuthProvider = ({ children }) => {
  const fetchedToken = localStorage.getItem('token');
  const [auth, setAuth] = useState({
    token: fetchedToken,
    isAuth: !!fetchedToken
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
