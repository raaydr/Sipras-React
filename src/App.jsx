import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';
import Home from './content/home.jsx';
import Login from './content/login.jsx';
import Register from './content/register.jsx';
import User from './content/user.jsx';

import AuthLayout from './layout/AuthLayout.jsx';
import GuestLayout from './layout/GuestLayout.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        
          <Navbar/>
            <Routes>
              <Route element={<AuthLayout/>}>
                <Route path='/' element={<Home />}/>
                <Route path='/Welcome' element={<User />}/>
              </Route>
              <Route element={<GuestLayout/>}>
                <Route path='/Login' element={<Login />}/>
                <Route path='/Register' element={<Register />}/>
              </Route>
              
              
              
            </Routes>
        
        
      
    </>
  )
}

export default App
