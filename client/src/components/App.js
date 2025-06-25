import React from "react";
import Hero from '../pages/Hero';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';
import Contact from '../pages/Contact';
import Services from '../pages/Services';




function App() {
  return (
  <div className="App">
      <Hero />
      <Navbar/>
      <Services/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
