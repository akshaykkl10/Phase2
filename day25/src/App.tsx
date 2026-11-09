import { Routes, Route } from 'react-router'
import './App.css'
import AppLayout from './layout/AppLayout'
import Dashboard from './pages/DashBoardPage'
import NotFoundPage from './pages/NotFoundPage'
import AuthLayout from './layout/AuthLayout'
import LoginCard from './components/LoginCard'
import RegisterCard from './components/RegisterCard'
import Projects from './pages/ProjectsPage'
import Issues from './pages/IssuesPage'

function App() {

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginCard/>}/>
        <Route path='/register' element={<RegisterCard/>}/>
      </Route>
      <Route path='/' element={<AppLayout />}>
        <Route index element={ <Dashboard/ >}/>
        <Route path='/dashboard' element={ <Dashboard/ >}/>
        <Route path='/projects' element={ <Projects/ >}/>
        <Route path='/issues' element={ <Issues/ >}/>
      </Route>
      <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
