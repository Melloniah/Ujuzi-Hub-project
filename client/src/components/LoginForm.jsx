import React, { useState } from "react";

export default function LoginForm({ onSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Required for cookie-based JWT!
        body: JSON.stringify({
          username: usernameOrEmail, // must be 'username' for your backend!
          password,
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to log in.");
      }
    } catch {
      setError("Server error.");
    }
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