import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const handleLogin = (data) => {
    setUser(data.user);
    setToken(data.token);
    setScreen("chat");
  };

  const handleRegister = (data) => {
    setUser(data.user);
    setToken(data.token);
    setScreen("chat");
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    setScreen("login");
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