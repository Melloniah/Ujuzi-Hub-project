import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/CTA.css";

const CTASection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/services");
  };

  return (
    <section className="cta-section">
      <h2 className="cta-heading">Find a Fundi Today</h2>
      <p className="cta-subtext">Get trusted help fast and affordably in just a few clicks.</p>
      <button className="cta-btn" onClick={handleClick}>Get Help in Minutes</button>
    </section>
  );
};

export default CTASection;
