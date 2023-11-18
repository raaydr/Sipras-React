import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';


import AuthLayout from './layout/AuthLayout.jsx';
import GuestLayout from './layout/GuestLayout.jsx';
import Home from './content/Home.jsx';
import Login from './content/Login.jsx';
import Register from './content/Register.jsx';
import User from './content/User.jsx';
import Forgotpassword from './content/Forgotpassword.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        
          <Navbar/>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route element={<AuthLayout/>}>
                
                <Route path='/Welcome' element={<User />}/>
              </Route>
              <Route element={<GuestLayout/>}>
                <Route path='/Login' element={<Login />}/>
                <Route path='/Register' element={<Register />}/>
                <Route path='/Forgotpassword' element={<Forgotpassword />}/>
              </Route>
              
              
              
            </Routes>
        
        
      
    </>
  )
}

export default App
