import React, { useContext } from 'react';
import Navbar from './NavBar.jsx';
import CursosGeneral from './CursosGeneral.jsx';
import { TokenContext } from '../main.jsx';
import { Container } from 'react-bootstrap';

export default function Home() {
  const token = useContext(TokenContext);
  return (
    
    <div>
      <video className="video-background" autoPlay muted loop>
        <source src="../../img/original-8c84d58757f2307620c18a5cd36e250f.mp4" type="video/mp4" />
      </video>
      <Navbar />
      <h1 className='text-center mt-5 text-white'>CODELIN</h1>
     <Container className='cursos'>
        <CursosGeneral />
     </Container>
      
      
    </div>
  );
}