import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = ({ token, user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      auth: { token },
    });

    // Join Lounge room after connecting
    socketRef.current.emit("join-room", "Lounge");

    socketRef.current.on("global-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/messages/Lounge", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
  }, [token]);

  const sendMessage = () => {
    if (input.trim()) {
      const msg = {
        content: input,
        room: "Lounge",
        senderId: user._id,
        senderName: user.username,
      };
      socketRef.current.emit("global-message", msg);
      setInput("");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="relative w-full max-w-md">
        <button
          onClick={onLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition duration-200 z-10"
        >
          Log Out
        </button>
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-2">
            Chat Room: Lounge
          </h2>
          <div className="h-80 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center">No messages yet.</div>
            ) : (
              messages.map((msg, i) => {
                const isOwn = msg.senderId === user._id;
                return isOwn ? (
                  <div key={i} className="mb-3 flex justify-end items-end">
                    <span
                      className="px-3 py-2 rounded-xl text-gray-700 bg-purple-200 text-right"
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.content}
                    </span>
                  </div>
                ) : (
                  <div key={i} className="mb-3 flex flex-col items-start">
                    <span className="font-semibold text-blue-500 mb-1">
                      {msg.senderName || msg.senderId}
                    </span>
                    <span
                      className="px-3 py-2 rounded-xl text-gray-700 bg-blue-100 text-left"
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.content}
                    </span>
                  </div>
                );
              })
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
    </div>
  );
};

export default Chat;
