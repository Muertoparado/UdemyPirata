import React from 'react';
import Navbar from './NavBar.jsx';
import CursosGeneral from './CursosGeneral.jsx';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      {/* Other content for the Home page */}
      <CursosGeneral />
      
    </div>
  );
}