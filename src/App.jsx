import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/detail/detail'
import NewUser from './pages/account/newUser/createUser'
import Login from './pages/account/login/login'
import Alquilar from './pages/borrowed/borrowed'
import Returned from './pages/returned/returned'
import Perfil from './pages/perfil/perfil'
import RecoverPassword from './pages/account/recoverPassword/recoverPassword'
import ResetContraseña from './pages/account/resetPassword/resetPassword'
import PanelAdmin from './admin/PanelAdmin'

function App() {
  return (
    <Router basename="/Proyectos-libros">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/CreateUser" element={<NewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alquilar/:id" element={<Alquilar />} />
        <Route path="/Returned/:id" element={<Returned />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/RecoverPassword" element={<RecoverPassword />} />
        <Route path="/ResetContraseña/:token" element={<ResetContraseña />} />
        <Route path="/admin/*" element={<PanelAdmin />} />
      </Routes>
    </Router>
  )
}

export default App
