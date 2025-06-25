import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Booking from "../pages/Booking";

import Hero from '../pages/Hero';

function App() {
  return (    
    <Router>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path='/booking' element={<Booking/>} />
      </Routes>      
    </Router>
  );
}

export default App;
