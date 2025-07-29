# WebSockets in Node.js

## 1. What is WebSocket?

WebSocket is a **protocol** that enables **full-duplex (bi-directional) communication** between the client and the server over a single, long-lived TCP connection. It solves the limitation of HTTP where the client must initiate every request.

* **Standard**: RFC 6455
* **Key Feature**: Real-time data exchange without repeated HTTP requests.

---

## 2. Why Multiple Implementations in Node.js?

Node.js provides the core networking capability, but different libraries implement the WebSocket protocol in different ways:

* **`ws`**: The most popular and lightweight WebSocket library for Node.js. Strict to the WebSocket protocol.
* **`socket.io`**: Abstracts WebSockets but adds fallbacks (polling, long polling) and extra features like rooms, events, and broadcasting.
* **Framework Integration**:

  * Express, Koa, Hono – these are HTTP frameworks. WebSocket can be added on top of them.

---

## 3. Companies and Low Latency

Companies that care about **low latency and high performance** (e.g., finance, gaming) often:

* Implement WebSockets from scratch in lower-level languages (C, Rust, Go) for **better control and speed**.

---

## 4. Why Socket.IO is Not Always Better

* Socket.IO is feature-rich but **not pure WebSocket**.
* It adds overhead (fallback to HTTP polling if WS fails).
* For strict compliance and performance → use **`ws`** or native WebSocket APIs.

---

## 5. More Real-Time Protocols

* **WebRTC**: Peer-to-peer connection for media streaming, often used for video calls.
* **QUIC**: A modern transport protocol by Google, faster than TCP, used in HTTP/3.

---

## 6. Polling vs Long Polling

* **Polling**:

  * Client repeatedly sends requests at intervals (e.g., every 5 seconds).
  * Wastes resources.
* **Long Polling**:

  * Client sends a request → server holds it until data is ready → responds → client immediately reconnects.
  * Reduces wasted requests, but still HTTP overhead.

**WebSockets > Long Polling > Polling** in terms of efficiency.

---

## 7. HTTP Pipelining

* A technique to send multiple HTTP requests without waiting for previous ones to complete.
* Rarely used because of complexity and Head-of-line blocking.

---

## 8. When You Create a Web Server in Node.js

* By default, you create an **HTTP server**.
* WebSockets are **upgraded** from HTTP via the `Upgrade` header (HTTP handshake → then switch to WS).

---

## 9. Example: WebSocket with Native `http`

```javascript
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Hello Client');
  });
});

server.listen(3000, () => console.log('Server on http://localhost:3000'));
```

---

## 10. Example: WebSocket with Express

```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => console.log(msg));
  ws.send('Connected via Express!');
});

app.get('/', (req, res) => res.send('Hello HTTP + WS'));

server.listen(3000);
```

---

## 11. Callbacks in `ws`

`ws` uses an **event-driven model** (callbacks):

* `connection`
* `message`
* `close`
* `error`

---

## 12. Testing WebSocket APIs

* **Hoppscotch.io**: Like Postman, but supports WebSocket connections.
* Open WebSocket tab → Enter WS URL → Send messages in real-time.

---

### Summary Table:

| Feature     | Polling  | Long Polling  | WebSocket         |
| ----------- | -------- | ------------- | ----------------- |
| Connection  | Repeated | One-at-a-time | Single persistent |
| Latency     | High     | Medium        | Low               |
| Server Load | High     | Medium        | Low               |
