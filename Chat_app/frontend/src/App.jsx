import React, { useState } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <Register
            onRegister={(data) => {
              setUser(data.user);
              setToken(data.token);
            }}
            onShowLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLogin={(data) => {
              setUser(data.user);
              setToken(data.token);
            }}
            onShowRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  return <Chat user={user} token={token} />;
}

export default App;
