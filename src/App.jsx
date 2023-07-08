import {Route, Routes} from 'react-router-dom'

import HeaderBar from './components/headerBar/HeaderBar'
import Scheduler from './pages/Scheduler'
import Notfound from './pages/Notfound'
import TaskForm from './components/taskForm/TaskForm'
import Login from './pages/Auth/Login/Login.jsx'
import Signup from './pages/Auth/Signup/Signup'
import AuthRouter from './components/authRouter/AuthRouter'


const tasks = [
  { date: "2022-01-01", time: "10:00 AM", description: "Task 1" },
  { date: "2022-01-02", time: "2:00 PM", description: "Task 2" }, //temporary
  { date: "2022-01-03", time: "5:30 PM", description: "Task 3" }
];

          

function App() {
  return (

    <>
      <Routes>
        <Route path='/' element={<HeaderBar />}>
          <Route path='*' element={<Notfound/> } />          
          <Route path='/login' element={<Login/> } />
          <Route path='/signup' element={<Signup/> } />

          <Route element={<AuthRouter />}>
            <Route path='/task-form' element={<TaskForm/> } />
            <Route path='/scheduler' element={<Scheduler tasks={tasks}/> } />
          </Route>
        </Route>
        

      </Routes>

    </>

  )
}


export default App