import '../components/SignUpForm.css';

//register a new user
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation

// onSignUp is a prop
function SignupForm({ onSuccess }) { 
  const[name, setName ] = useState("")
  const [email,setEmail] =useState("")
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate(); // navigation hook

  const [user, setUser] = useState()

  console.log(user)

  // Fetch users
  // Extracted signup logic
  const signupUser = async ({ username, email, password, phone_number }) => {
    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
          phone_number
        })
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data); // Set user in parent or global state
        onSuccess?.(); // Call success callback if provided

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setPhonenumber("");

        // Alert user
        alert("Signup successful!");

        // Redirect to login
        navigate("/login");

      } else {
        setError(data.error || "Failed to sign up.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Call signup function with form data
    await signupUser({
      username: name,
      email,
      password,
      phone_number: phonenumber
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        name="name"
        placeholder="userName"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <input
        type="phoneNumber"
        name="phoneNumber"
        placeholder="PhoneNumber"
        value={phonenumber}
        onChange={e => setPhonenumber(e.target.value)}
        required
      />


      <button type="submit">Sign Up</button>
      {error && <div style={{color: "red"}}>{error}</div>}
    </form>
  );
}

export default SignupForm;