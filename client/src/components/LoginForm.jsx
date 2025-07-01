import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Provider"; // import your context hook

export default function LoginForm({ onSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useTheContext();  // get setUser from context

  const loginUser = async ({ username, password }) => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data); // update global user state in context
        alert("Login successful!");
        navigate("/"); // redirect after login
        onSuccess?.(); // call optional onSuccess callback
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
      password,
    });
    setUsernameOrEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        placeholder="Username or Email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
