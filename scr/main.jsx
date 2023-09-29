import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
//import Navbar from './components/NavBar.jsx'
import Home from './components/Home.jsx'


ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/home" element={<Home />} />
    </Routes>
    </BrowserRouter>
    </React.StrictMode>,
)
    