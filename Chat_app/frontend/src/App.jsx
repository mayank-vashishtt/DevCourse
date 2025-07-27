import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <Register onRegister={data => { setUser(data.user); setToken(data.token); }} />
        ) : (
          <Login onLogin={data => { setUser(data.user); setToken(data.token); }} />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Go to Login" : "Go to Register"}
        </button>
      </div>
    );
  }

  return <Chat user={user} token={token} />;
}

export default App;