import React, { useState } from "react";
import axios from "axios";
import loginImage from "./login.png";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
        referralCode,
      });
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="flex w-screen h-screen bg-cover bg-center font-poppins"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="flex-1"></div>
      <div className="flex flex-col justify-center items-start w-2/5 h-full px-16">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6 text-white w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <input
            className="border-b border-gray-500 bg-transparent text-lg px-2 py-1 focus:outline-none focus:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="border-b border-gray-500 bg-transparent text-lg px-2 py-1 focus:outline-none focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="border-b border-gray-500 bg-transparent text-lg px-2 py-1 focus:outline-none focus:border-blue-500"
            placeholder="Referral Code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}
