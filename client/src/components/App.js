import React from "react";
import { Routes, Route } from "react-router-dom";

import Booking from "../pages/Booking";
import Services from "../pages/Services";
import Hero from "../pages/Hero";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import Contact from "../pages/Contact";
import FundiDetail from "../pages/FundiDetails";
import ReviewForm from "../components/ReviewForm";
import LoginPage from "../pages/LoginPage";
import CTA from "../pages/CTA"

function App() {
  return (    
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CTA/>
              <Contact />
              
            </>
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fundi/:id" element={<FundiDetail />} />
        <Route path="/fundi/:id/book" element={<Booking />} />
        <Route path="/fundi/:id/review" element={<ReviewForm />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
