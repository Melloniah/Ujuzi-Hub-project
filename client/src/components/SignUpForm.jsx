//register a new user
import React, { useState } from 'react';

// onSignUp is a prop
function SignupForm({ onSuccess }) { 
  const[name, setName ] = useState("")
  const [email,setEmail] =useState("")
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("")
  const [error, setError] = useState("")
  


  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    try{
      const res = await fetch("/signup", {
        method: "POST",
        header: {"Content-Type" : "application/json"},
        body: JSON.stringify({email, password}),
        credentials: "include", //important for cookies
      });
      if (res.ok){
        onSuccess();
      }else {
        const data = await res.json();
        setError(data.message || "Failed to sign up.");
      }
    }catch {
      setError("Server error.");
    }   
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
