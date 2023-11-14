import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        
          <Navbar/>
            <Routes>
              <Route path='/'/>
              <Route path='/Login'/>
              <Route path='/Register' />
              
            </Routes>
        
        
      </BrowserRouter>
    </>
  )
}

export default App
