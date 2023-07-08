import { useState } from 'react';

import { AuthContext } from './AuthContext.jsx';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: null,
    token: null,
    isAuth: false
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
