## 1. What is a Blob?

**Definition:**
A **Blob** stands for **Binary Large Object**. It is a data type that stores binary data (e.g., images, audio files, videos, documents) in a single entity.

In **Web Development**, a `Blob` object represents immutable raw data. You can create it from:

* Text
* Binary data
* ArrayBuffer
* Files

**Example:**

```javascript
const blob = new Blob(["Hello World"], { type: "text/plain" });
console.log(blob);
```

This creates a Blob containing the text "Hello World" with the MIME type `text/plain`.

---

### **Why is Blob used in browsers?**

* Efficiently store and transfer large data like files.
* Can be converted to `Object URLs` for download or display.
* Often used in **file uploads** and **audio/video recordings**.

**Key Methods:**

* `URL.createObjectURL(blob)` → Temporary URL for Blob
* `FileReader.readAsText(blob)` or `readAsArrayBuffer(blob)`

---

## 2. WebSocket Client-side Code (React Example)

We use **WebSocket** for real-time, full-duplex communication between client and server.

Here is how to implement it with **React Hooks** (`useState` + `useEffect`):

```javascript
import React, { useState, useEffect } from "react";

export default function WebSocketExample() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. Create WebSocket connection
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send("Hello Server");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("Hello from Client!");
    }
  };

  return (
    <div>
      <h2>WebSocket Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
```

---

## 3. Why WebSocket does **NOT** need an import?

Unlike `axios` or `socket.io-client`, the **WebSocket API is built into browsers and Node.js**.

* In a browser, `WebSocket` is a **native global class**, just like `fetch`, `document`, or `window`.
* No extra library is required unless you need advanced features.

So you can directly do:

```javascript
const ws = new WebSocket("ws://localhost:8080");
```

If you use **Socket.IO**, you must import it because it's a custom library on top of WebSocket.

---

## 4. Using WebSocket with Blob (Example: Sending Audio)

WebSockets can send **binary data** like images, audio, and video efficiently. Here’s how you can send a **Blob** (e.g., audio recording) from the client to the server using WebSocket.

### **Client-Side Example:**

```javascript
function sendAudio(blob) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(blob);
  }
}

mediaRecorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    sendAudio(event.data);
  }
};
```

Server-side in Node.js:

```javascript
ws.on('message', (data) => {
  if (Buffer.isBuffer(data)) {
    console.log('Received binary data of length:', data.length);
  } else {
    console.log('Text message:', data.toString());
  }
});
```

---

## 5. Comparison: WebSocket vs HTTP Polling vs SSE

| Feature       | HTTP Polling                 | SSE (Server-Sent Events)  | WebSocket               |
| ------------- | ---------------------------- | ------------------------- | ----------------------- |
| **Direction** | Client → Server only         | Server → Client only      | Both ways               |
| **Real-time** | ❌ (delayed updates)          | ✅ (real-time updates)     | ✅ (full-duplex)         |
| **Overhead**  | High (new HTTP req per poll) | Low                       | Very Low                |
| **Best For**  | Occasional updates           | Notifications, live feeds | Chat, gaming, streaming |

---

## 6. Server-Side WebSocket (Node.js)

Minimal WebSocket server using **ws**:

```javascript
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => console.log('Client disconnected'));
});
```

Run:

```bash
npm install ws
node server.js
```

---
