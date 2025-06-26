import React from "react";
import { FundiCard } from "../components/FundiCard";
import "../pages/Services.css";

// Images
import plumber1 from "../Assets/Plumber 1.jpeg";
import plumber2 from "../Assets/Plumber 2.jpg";
import ladyPlumber from "../Assets/lady plumber.webp";

import electrician1 from "../Assets/electrician.jpeg";
import electrician2 from "../Assets/electrician2.jpeg";
import ladyElectrician from "../Assets/Lady electrician.png";

import painter1 from "../Assets/Painters.jpg";
import painter2 from "../Assets/painter lady.webp";
import painter3 from "../Assets/painter lady 2.jpg";

// Fundis Data
const plumbers = [
  {
    id: 1,
    name: "John Mwangi",
    service: "Licensed plumber with 5 years experience in Kisumu.",
    image: plumber1,
  },
  {
    id: 2,
    name: "Elias Wafula",
    service: "Expert in residential plumbing, based in Nairobi.",
    image: plumber2,
  },
  {
    id: 3,
    name: "Liz Cheptoo",
    service: "Fast and affordable plumber available in Eldoret.",
    image: ladyPlumber,
  },
];

const electricians = [
  {
    id: 4,
    name: "Brian Too",
    service: "Experienced electrician in Nairobi, 2 years in residential wiring.",
    image: electrician1,
  },
  {
    id: 5,
    name: "Will Ochieng",
    service: "Specialist in solar panel installation in Kisii region.",
    image: electrician2,
  },
  {
    id: 6,
    name: "Kelvin Otieno",
    service: "Certified commercial electrician available in Mombasa.",
    image: ladyElectrician,
  },
];

const painters = [
  {
    id: 7,
    name: "James Njoroge",
    service: "Interior and exterior painter based in Nakuru.",
    image: painter1,
  },
  {
    id: 8,
    name: "Anne Kariuki",
    service: "Expert in modern wall finishes and color design.",
    image: painter2,
  },
  {
    id: 9,
    name: "Faith Wambui",
    service: "Affordable home painting services in Thika.",
    image: painter3,
  },
];

const Services = () => {
  return (
    <div>
      <h1 className="category-title">Plumbers</h1>
      <div className="services-wrapper">
        {plumbers.map((fundi) => (
          <FundiCard key={fundi.id} fundi={fundi} />
        ))}
      </div>

      <h1 className="category-title">Electricians</h1>
      <div className="services-wrapper">
        {electricians.map((fundi) => (
          <FundiCard key={fundi.id} fundi={fundi} />
        ))}
      </div>

      <h1 className="category-title">Painters</h1>
      <div className="services-wrapper">
        {painters.map((fundi) => (
          <FundiCard key={fundi.id} fundi={fundi} />
        ))}
      </div>
    </div>
  );
};

export default Services;
