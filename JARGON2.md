## 1. WebSocket vs WebRTC

### **WebSocket**

* Full-duplex communication over **TCP**.
* Great for **real-time messaging**, **notifications**, **chat apps**.
* Server acts as a relay for all messages.
* Guarantees message order and delivery.

### **WebRTC**

* **Peer-to-peer (P2P)** communication protocol.
* Uses **UDP** (with fallback to TCP) for **low latency**.
* Great for **video/audio streaming**, **real-time games**, and **file sharing**.
* Requires a **signaling server** (often WebSocket) to exchange connection details (ICE candidates, SDP).
* After signaling, peers connect directly without routing data through the server (except for TURN relay when NAT issues exist).

---

## 2. TCP vs UDP

| Feature         | TCP                            | UDP                        |
| --------------- | ------------------------------ | -------------------------- |
| **Connection**  | Connection-oriented            | Connectionless             |
| **Reliability** | Reliable (retransmits)         | Unreliable (no retransmit) |
| **Order**       | Guaranteed                     | Not guaranteed             |
| **Speed**       | Slower (handshakes)            | Faster (lightweight)       |
| **Use Case**    | HTTP, WebSocket, File transfer | Video streaming, Gaming    |

---

## 3. How Multiplayer Games Work (Detailed)

### **Architecture: Centralized (Common Approach)**

* **Clients** (players) → **Game Server** → Syncs state → Broadcast to all clients.

### **Steps:**

1. **Connection:**

   * Most games use **UDP** for speed (via custom protocol or WebRTC DataChannel).
   * TCP introduces latency due to retransmission and ordering.

2. **Game Loop:**

   * Clients send **player inputs** (not full state) to server.
   * Server simulates game world and sends **state updates** back.

3. **State Sync:**

   * Server sends **snapshots** or **delta updates** (only changes).

4. **Lag Compensation:**

   * Predictive algorithms: Clients guess future positions.
   * Server reconciliation: Fixes wrong predictions when authoritative state arrives.

### **Why not P2P for most games?**

* **Cheating risk** (players could manipulate state).
* **NAT/firewall issues** (P2P connectivity fails without TURN relay).
* ** Server authoritative model ensures fairness** and consistent game state.

---

## 4. P2P in Gaming

* Still used in **casual or small games**, or **WebRTC-based apps**.
* Requires:

  * Signaling server for peer discovery.
  * STUN/TURN servers for NAT traversal.
* **Benefit:** Low latency, reduced server cost.
* **Drawback:** Security, complexity.

---

## 5. Protocol Choices

* **Fast-paced games** (FPS, racing): UDP + custom reliability layer.
* **Turn-based games** (chess, card games): WebSocket/TCP.
* **P2P (WebRTC)**: Small-scale games or direct player interactions.

---

