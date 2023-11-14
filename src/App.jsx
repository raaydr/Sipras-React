import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';
import Home from './content/Home';
import Login from './content/Login';
import Register from './content/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        
          <Navbar/>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Login' element={<Login />}/>
              <Route path='/Register' element={<Register />}/>
              
            </Routes>
        
        
      </BrowserRouter>
    </>
  )
}

export default App
