import React, { useContext } from 'react';
import Navbar from './NavBar.jsx';
import CursosGeneral from './CursosGeneral.jsx';
import { TokenContext } from '../main.jsx';

export default function Home() {
  const token = useContext(TokenContext);
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      {/* Other content for the Home page */}
      <CursosGeneral />
      
    </div>
  );
}