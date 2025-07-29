import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={handleLogin}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-gray-100"
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-blue-700 tracking-tight">
            Login
          </h2>
          <div className="flex flex-col gap-4">
            <input
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-lg transition"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-lg transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-lg transition"
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg text-lg mt-2"
          >
            Login
          </button>
          {error && (
            <div className="text-red-500 text-center text-base mt-2">
              {error}
            </div>
          )}
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500">Don't have an account?</span>
          <button
            type="button"
            onClick={onShowRegister}
            className="ml-2 text-blue-600 hover:underline font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
