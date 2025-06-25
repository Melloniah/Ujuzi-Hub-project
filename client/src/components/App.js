import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Booking from "../pages/Booking";
import Review from "..pages/Review";
import Hero from '../pages/Hero';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function App() {
  return (    
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/review" element={<Review/>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
