import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import getCurrentUser from './customHooks/getCurrentUser'

export const serverUrl = "http://localhost:8000"
const App = () => {
    getCurrentUser();

  return (
   <>
   <Toaster/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
   </>
  )
}

export default App