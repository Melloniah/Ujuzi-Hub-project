import React from "react";
import "../pages/Hero.css";

// import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-text">
        <h1>Find Trusted Fundis for Any Task</h1>
        <p>FundiConnect is your one-stop platform to discover skilled professionals near you—
          whether you need a plumber, electrician, or painter. Browse verified profiles,
          explore service areas and past work, read reviews, and book fundis quickly and easily.</p>
        
            {/* <ScrollLink to='mt-4' smooth={true} offset={0} duration={500} className="btn btn-light" >Explore</ScrollLink> */}
        </div>


    </div>
  )
}

export default Hero;