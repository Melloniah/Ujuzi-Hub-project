
import React, { useEffect, useState } from "react";
import { FundiCard } from "../components/FundiCard"; 
import "./FundiList.css"; 

export default function FundiList() {
  const [fundis, setFundis] = useState([]);

  useEffect(() => {
    fetch("/fundis")
      .then((res) => res.json())
      .then((data) => setFundis(data))
      .catch((err) => console.error("Error fetching fundis:", err));
  }, []);

  return (
    <div className="fundi-list">
      <h1>All Fundis</h1>
      <div className="fundi-grid">
        {fundis.map((fundi) => (
          <FundiCard key={fundi.id} fundi={fundi} />
        ))}
      </div>
    </div>
  );
}
