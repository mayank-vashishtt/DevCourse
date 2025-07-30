## 1. Why use `"use client"` with WebSocket in Next.js?

In **Next.js**, components are by default **Server Components** in the App Router (Next.js 13+). Server Components **run on the server** and cannot use browser-only APIs like `WebSocket`, `window`, or `document`.

When you add:

```javascript
"use client";
```

it tells Next.js that the component should be rendered on the **client side**, enabling usage of browser APIs.

**Example:**

```javascript
"use client";
import { useEffect, useState } from 'react';

export default function WSClient() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => setMessage(event.data);

    return () => ws.close();
  }, []);

  return <div>Message: {message}</div>;
}
```

If you don’t add `"use client"`, this code will throw an error because **WebSocket is not available on the server side**.

---

## 2. What if I build a WebSocket Backend in Next.js?

* You can create a WebSocket server in **Next.js API routes** or the `app/api` folder.
* Example:

```javascript
// app/api/ws/route.js
import { WebSocketServer } from 'ws';

let wss;

export function GET(req) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });
    console.log('WebSocket Server initialized');
  }

  const { socket } = req;
  wss.handleUpgrade(req, socket, Buffer.alloc(0), (ws) => {
    wss.emit('connection', ws, req);
  });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send(`Echo: ${message}`);
    });
  });

  return new Response(null, { status: 101 });
}
```

### **Deployment Consideration:**

* Serverless environments (like Vercel) **cannot keep WS connections open**.
* For WS, use:

  * **Custom Node server** with Next.js.
  * Or a dedicated WS service (Pusher, Ably).

---

## 3. Scaling WebSocket Servers

### **Challenges:**

* WebSockets are **stateful** (persistent connections).
* Horizontal scaling is complex because each server only knows its connected clients.

### **HTTP vs WebSocket Scaling:**

| Aspect      | HTTP         | WebSocket                            |
| ----------- | ------------ | ------------------------------------ |
| **State**   | Stateless    | Stateful                             |
| **Scaling** | Easy with LB | Needs sticky sessions & shared state |

---

## 4. How many users per server?

* **HTTP**: Thousands of requests/sec (short-lived).
* **WebSocket**: Typically 10k–50k concurrent connections per Node server (depends on resources).

---

## 5. Problems in WS Scaling

* Clients on different servers → cross-server message issues.
* Need **sticky sessions** or **central broker** (Redis, Kafka) for state sharing.

---

## 6. Scaling Strategies

### **Vertical Scaling**

* Add more CPU/RAM to one server.
* Simple but limited.

### **Horizontal Scaling**

* Add more servers behind a load balancer.
* Requires sticky sessions or shared state.

### **Sharding**

* Divide clients by region or ID across shards.

---

## 7. Sticky Connections

* Ensure client always connects to the same server via LB (e.g., Nginx `ip_hash`).

---

## 8. Multi-Server WS with Redis Pub/Sub

When scaling horizontally, use **Redis** to sync messages:

```javascript
import { createClient } from 'redis';
const pub = createClient();
const sub = createClient();

await pub.connect();
await sub.connect();

sub.subscribe('broadcast', (message) => {
  wss.clients.forEach((client) => client.send(message));
});

function broadcast(msg) {
  pub.publish('broadcast', msg);
}
```

---
