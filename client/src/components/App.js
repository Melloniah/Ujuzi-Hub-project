import React from "react";
import { Routes, Route } from "react-router-dom";

import Booking from "../pages/Booking";
import BookingForm from "../components/BookingForm"; // add & path="/booking_form"
import Services from "../pages/Services";
import Hero from "../pages/Hero";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import Contact from "../pages/Contact";
import FundiDetail from "../pages/FundiDetails";
import ReviewForm from "../components/ReviewForm";
import LoginPage from "../pages/LoginPage";
import CTA from "../pages/CTA"
import FAQ from "../pages/FAQ"
import AboutUsSection from "../pages/AboutUs"
import FundiList from "../pages/FundiList"; 




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
              <AboutUsSection/>
              <CTA/>
              <FAQ/>
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fundi" element={<FundiList />} />
        <Route path="/fundi/:id" element={<FundiDetail />} />
        {/* <Route path="/fundi/:id/book" element={<Booking />} /> */}
        <Route path="/fundi/:id/review" element={<ReviewForm bookingId={1} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fundi/:id/book" element={<BookingForm />} />
      </Routes>

    
    </div>
  );
}

export default App;
