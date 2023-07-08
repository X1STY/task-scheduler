import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Auth/Login/Login'
import Scheduler from './pages/Scheduler'
import Notfound from './pages/Notfound'
import TaskForm from './components/taskForm/TaskForm'


const tasks = [
  { date: "2022-01-01", time: "10:00 AM", description: "Task 1" },
  { date: "2022-01-02", time: "2:00 PM", description: "Task 2" },
  { date: "2022-01-03", time: "5:30 PM", description: "Task 3" }
];

function App() {
  return (

    <>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/task-form' element={<TaskForm/> } />
        <Route path='/login' element={<Login/> } />
        <Route path='/scheduler' element={<Scheduler tasks={tasks}/> } />
        <Route path='*' element={<Notfound/> } />

      </Routes>

    </>

  )
}


export default App