import React, { useState } from "react";
import axios from "axios";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
        referralCode,
      });
      onRegister(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input placeholder="Referral Code" value={referralCode} onChange={e => setReferralCode(e.target.value)} required />
      <button type="submit">Register</button>
      {error && <div style={{color:"red"}}>{error}</div>}
    </form>
  );
}