// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
import React from "react";
import Hero from '../pages/Hero';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
      <Navbar/>
      <Footer/>
    </div>
  );
}

export default App;
