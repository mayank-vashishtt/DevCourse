import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat({ user, token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    // Connect to socket.io with JWT
    socketRef.current = io("http://localhost:3000", {
      auth: { token }
    });

    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [token]);

  useEffect(() => {
    // Fetch initial messages for Lounge
    axios.get("http://localhost:3000/api/messages/Lounge", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMessages(res.data));
  }, [token]);

  const sendMessage = () => {
    if (input.trim()) {
      socketRef.current.emit("message", { content: input, room: "Lounge" });
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Room: Lounge</h2>
      <div style={{height:300,overflowY:"auto",border:"1px solid #ccc"}}>
        {messages.map((msg, i) => (
          <div key={i}><b>{msg.senderId}</b>: {msg.content}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}