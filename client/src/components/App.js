import React from "react";
import { Routes, Route } from "react-router-dom";

import Booking from "../pages/Booking";
import Services from "../pages/Services";
import Hero from "../pages/Hero";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import Contact from "../pages/Contact";
import FundiDetail from "../pages/FundiDetails";
import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";
import LoginPage from "../pages/LoginPage";

import Services from "../pages/Services";
import CTA from "../pages/CTA"
import FAQ from "../pages/FAQ"
import AboutUsSection from "../pages/AboutUs"


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
              <Services/>
              <AboutUsSection/>
              <CTA/>
              <FAQ/>
              <Contact />
              
            </>
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fundi/:id" element={<FundiDetail />} />
        <Route path="/fundi/:id/book" element={<BookingForm />} />
        <Route path="/fundi/:id/review" element={<ReviewForm />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
