import { Routes, Route } from 'react-router'
import './App.css'
import AppLayout from './layout/AppLayout'
import Dashboard from './components/DashBoard'
import NotFoundPage from './pages/NotFoundPage'
import AuthLayout from './layout/AuthLayout'
import LoginCard from './components/LoginCard'
import RegisterCard from './components/RegisterCard'

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
      </Route>
      <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
