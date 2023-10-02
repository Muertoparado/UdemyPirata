import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './NavBar.jsx';
//import Footer from './Footer';
//import HomePage from './HomePage';
//import AboutPage from './AboutPage';
//import ContactPage from './ContactPage';
import {CursosGeneral} from './CursosGeneral.jsx'
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
