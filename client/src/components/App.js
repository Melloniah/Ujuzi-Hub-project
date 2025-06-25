import React from "react";
import { Routes, Route } from "react-router-dom";

import Booking from "../pages/Booking";
import Review from "../pages/Review";
import Hero from "../pages/Hero";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import Contact from "../pages/Contact";

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
        <Route path="/review" element={<Review />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
