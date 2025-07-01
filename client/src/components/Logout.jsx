import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Provider";

export default function Navbar() {
  const { user, setUser } = useTheContext();
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    alert("You have logged out");
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}