import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

export default function LoginForm({ onSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // navigation hook

  const [user, setUser] = useState()
  
  console.log(user)
  const loginUser = async ({ username, password }) => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // for cookies
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data); // optional: store user context
        alert("Login successful!");
        navigate("/"); // redirect to home or dashboard
      } else {
        setError(data.error || "Failed to log in.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    await loginUser({
      username: usernameOrEmail,
      password
    });

    // Optional: clear form fields
    setUsernameOrEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={usernameOrEmail}
        onChange={e => setUsernameOrEmail(e.target.value)}
        placeholder="Username or Email"
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

//user enters his/her credentials.
//the form submits data(send POST request to /login)
//backend checks if the user exist if okay response =200, if no=400
//if .ok onSuccess() is called
//if not .the error is shown to the user.