import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat({ user, token, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    // Connect to socket.io with JWT
    socketRef.current = io("http://localhost:3000", {
      auth: { token },
    });

    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [token]);

  useEffect(() => {
    // Fetch initial messages for Lounge
    axios
      .get("http://localhost:3000/api/messages/Lounge", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
  }, [token]);

  const sendMessage = () => {
    if (input.trim()) {
      socketRef.current.emit("message", { content: input, room: "Lounge" });
      setInput("");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 relative">
      <button
        onClick={onLogout}
        className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition duration-200 z-10"
      >
        Log Out
      </button>
      <div className="bg-white rounded-2xl shadow-2xl w-3/4 max-w-3xl mx-auto p-8 flex flex-col gap-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-2">
          Chat Room: Lounge
        </h2>
        <div className="h-96 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center">No messages yet.</div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="mb-3 flex items-center">
                <span className="font-semibold text-blue-500 mr-2">
                  {msg.senderId}
                </span>
                <span className="bg-blue-100 px-3 py-2 rounded-xl text-gray-700">
                  {msg.content}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-lg text-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
