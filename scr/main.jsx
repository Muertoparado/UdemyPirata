
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';


ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);*/



import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import CursoEspecifico from './components/CursoEspecifico.jsx';
import SuperAdmin from './components/SuperAdmin.jsx';
import EduCursos from './components/EduCursos.jsx';
import Ok from './components/Ok.jsx';
import { UserProvider } from './components/UserContex.jsx';
import MisCursos from './components/MisCursos.jsx';
import Register from './components/Register.jsx';

// Define el TokenContext
export const TokenContext = React.createContext(null);

//function getCookie(token) {
//  const value = `; ${document.cookie}`;
 // const parts = value.split(`; ${token}=`);
 // if (parts.length === 2) return parts.pop().split(';').shift();
//}

//const token = getCookie('token');

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/CursoEspecifico/:id" element={<CursoEspecifico />} />
          <Route path='/superadmin' element={<SuperAdmin />} />
          <Route path='/educador' element={<EduCursos />} />
          <Route path='/ok' element={<Ok />} />
          <Route path='/miscursos' element={<MisCursos/>}/>
          <Route path='/registrar' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      </UserProvider>
  </React.StrictMode>
);
