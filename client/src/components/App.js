import React from "react";
import { Routes, Route } from "react-router-dom";

import Booking from "../pages/Booking";
import Services from "../pages/Services";
import Hero from "../pages/Hero";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import Contact from "../pages/Contact";
import FundiDetail from "./pages/FundiDetail";
import BookingForm from "./components/BookingForm";
import ReviewForm from "./components/ReviewForm";

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
              <Contact />
            </>
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fundi/:id" element={<FundiDetail />} />
        <Route path="/fundi/:id/book" element={<BookingForm />} />
        <Route path="/fundi/:id/review" element={<ReviewForm />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
