import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { useAuthContext } from '../../contexts/auth/useAuthContext';

const HeaderBar = () => {
  //const isAuth = localStorage.getItem('token');
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  const isAuth = auth.isAuth;

  const logoutFun = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuth: false });
    navigate('/login');
  };

  return (
    <>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='fixed' sx={{ bgcolor: 'general.lightGreen' }}>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Plankton
              </Typography>

              {!isAuth && (
                <>
                  <Button color='inherit' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button color='inherit' onClick={() => navigate('/signup')}>
                    Sign up
                  </Button>
                </>
              )}
              {isAuth && (
                <>
                  <Button color='inherit' onClick={logoutFun}>
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </header>

      <Outlet />
    </>
  );
};

export default HeaderBar;
