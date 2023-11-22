import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LayoutBar from './components/layoutTest';
import { useEffect } from "react";

import AuthLayout from './layout/AuthLayout.jsx';
import GuestLayout from './layout/GuestLayout.jsx';
import Home from './content/Home.jsx';
import Iden from './content/User.jsx';
import Login from './content/LoginTest.jsx';
import Register from './content/RegisterTest.jsx';
import ResetPassword from './content/ResetPasswordTest.jsx';
import Forgotpassword from './content/ForgotPasswordTest.jsx';
import LandingLayout from './components/LandingLayout.jsx';
import Landing from './content/Landing.jsx';

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
              
              <Route element={<AuthLayout/>}>
                  
                  <Route path='/Welcome' element={
                    <LayoutBar>
                    <Iden />
                    </LayoutBar>}/>
                  
                  <Route path='/Reset-Password' element={
                    <LayoutBar>
                      <ResetPassword />
                    </LayoutBar>}/>


              </Route>
              <Route element={<GuestLayout/>}>
              
                  <Route path='/' element={
                    <LandingLayout>
                      <Landing />
                    </LandingLayout>}/>
                    
                  <Route path='/Login' element={
                    <LandingLayout>
                      <Login />
                    </LandingLayout>}/>
                
                  <Route path='/Forgotpassword' element={
                    <LandingLayout>
                      <Forgotpassword />
                    </LandingLayout>}/>

                  <Route path='/Register' element={
                    <LandingLayout>
                      <Register />
                    </LandingLayout>}/>  
              </Route>
            </Routes>
        
                    
      
    </>
  )
}

export default App
