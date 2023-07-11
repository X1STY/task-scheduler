import { Route, Routes } from 'react-router-dom';

import AuthRouter from './components/authRouter/AuthRouter';
import HeaderBar from './components/headerBar/HeaderBar';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import Notfound from './pages/Notfound';
import Scheduler from './pages/Scheduler/Scheduler';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HeaderBar />}>
          <Route path='*' element={<Notfound />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<AuthRouter />}>
            <Route path='/scheduler' element={<Scheduler />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
