// src/Routing/Routing.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MatrixCalculator from '../Pages/MatrixCalculator';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';


const Routing = ({ darkMode, setDarkMode }) => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<MatrixCalculator />} />
      </Routes>
     <Footer/>
    </>
  );
};

export default Routing;
