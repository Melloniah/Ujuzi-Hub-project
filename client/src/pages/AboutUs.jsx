import React from "react";
import "../pages/AboutUs.css";
import aboutImage from "../Assets/about-us-image.jpg";

const AboutUsSection = () => {
  return (
    <section className="about-us">
      <div className="about-content">
        <div className="about-text">
          <h2>About Ujuzi Hub</h2>
          <p>
            Ujuzi Hub was founded with one mission in mind;to connect Kenyan households and businesses
            with skilled and verified fundis including plumbers, electricians, and painters.
          </p>
          <p>
            We believe in empowering local talent and making home repairs and upgrades simple, fast,
            and trustworthy for everyone. With a growing network of professionals and an easy-to-use
            platform, we aim to redefine service delivery in Kenya.
          </p>
          <h3>Our Mission</h3>
          <p>
            To build a digital bridge between skilled fundis and people who need trusted, on-demand services.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Ujuzi Hub Team at work" />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
