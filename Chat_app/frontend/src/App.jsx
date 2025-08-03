import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  // Restore user/token from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setScreen("chat");
    }
  }, []);

  const handleLogin = (data) => {
    setUser(data.user);
    setToken(data.token);
    setScreen("chat");
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const handleRegister = (data) => {
    setUser(data.user);
    setToken(data.token);
    setScreen("chat");
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    setScreen("login");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <>
      {screen === "login" && (
        <Login
          onLogin={handleLogin}
          onShowRegister={() => setScreen("register")}
        />
      )}
      {screen === "register" && (
        <Register
          onRegister={handleRegister}
          onShowLogin={() => setScreen("login")}
        />
      )}
      {screen === "chat" && (
        <Chat user={user} token={token} onLogout={handleLogout} />
      )}
    </>
  );
}
