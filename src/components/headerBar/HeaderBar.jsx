import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/AuthProvider";

import { theme } from '../../assets/muiTheme'
import { AppBar, Box, Toolbar, Button, Typography, ThemeProvider } from "@mui/material"


const HeaderBar = () => {

  const { auth, setAuth } = useContext(AuthContext)
  const isAuth = auth?.isAuth

  const navigate = useNavigate();

  const logoutFun = () => {
    setAuth({email:null, token:null, isAuth:false})
    navigate('/login');
    }

  return (
    <>
    <header>
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{bgcolor: 'general.purple'}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Plankton
            </Typography>

            {!isAuth && 
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>Sign up</Button>
            </>          
            }
            {isAuth && 
            <>
              <Button color="inherit" onClick={logoutFun}>Logout</Button>
            </>
            }


          </Toolbar>
        </AppBar>
     </Box>
    </ThemeProvider>
    </header>

    <Outlet />
    </>
    
  )
}

export default HeaderBar