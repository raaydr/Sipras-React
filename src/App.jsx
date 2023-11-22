import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';
import LayoutBar from './components/layoutTest';
import { useEffect } from "react";

import AuthLayout from './layout/AuthLayout.jsx';
import GuestLayout from './layout/GuestLayout.jsx';
import Home from './content/Home.jsx';
import Login1 from './content/Login.jsx';
import Register1 from './content/Register.jsx';
import Iden from './content/User.jsx';
import Forgotpassword1 from './content/Forgotpassword.jsx';
import Login from './content/LoginTest.jsx';
import Register from './content/RegisterTest.jsx';
import ResetPassword from './content/ResetPasswordTest.jsx';
import Forgotpassword from './content/ForgotPasswordTest.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'flowbite';
import { initFlowbite } from 'flowbite';


function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      
        
        
          
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route element={<AuthLayout/>}>
                  
                    <Route path='/Welcome' element={
                    <LayoutBar>
                    <Forgotpassword />
                    </LayoutBar>}/>
                  
                  <Route path='/Reset-Password' element={
                  <LayoutBar>
                    <ResetPassword />
                    </LayoutBar>}/>
                
              </Route>
              <Route element={<GuestLayout/>}>
                <Route path='/Login1' element={<Login1 />}/>
                <Route path='/Login' element={
                    <LayoutBar>
                    <Login />
                    </LayoutBar>}/>
                    <Route path='/Forgotpassword' element={
                    <LayoutBar>
                    <Forgotpassword />
                    </LayoutBar>}/>
                <Route path='/Register' element={<Register />}/>
                <Route path='/Register1' element={<Register1 />}/>
                
              </Route>
            </Routes>
        
                    
      
    </>
  )
}

export default App
