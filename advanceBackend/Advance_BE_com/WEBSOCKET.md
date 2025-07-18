**WebSockets, HTTP, TCP, and Real-Time Communication - Explained in Simple English**

---

### What is a TCP Connection?

**TCP** stands for **Transmission Control Protocol**. It is like a phone call between two computers.

* When two computers want to talk, they first set up a connection.
* This is done using a **3-way handshake**.

#### The 3-Way Handshake:

1. **SYN**: Computer A says "Hello, I want to talk".
2. **SYN-ACK**: Computer B says "Okay, I heard you. I also want to talk".
3. **ACK**: Computer A replies "Great! Let's talk."

Now, both computers can send messages back and forth.

TCP is used under both **HTTP** and **WebSockets**.

---

### What are Other Protocols Besides TCP?

There are other communication protocols used depending on the use case:

#### 1. **UDP (User Datagram Protocol)**

* Faster but less reliable than TCP.
* No connection setup (no 3-way handshake).
* Used in: video streaming, voice calls, online gaming.
* Example: YouTube, Zoom, PUBG.

#### 2. **HTTP/3 (based on QUIC)**

* Uses QUIC protocol over UDP instead of TCP.
* Faster connection setup.
* More secure and modern.
* Google and Facebook use this for faster browsing.

#### 3. **FTP (File Transfer Protocol)**

* Used to send files between computers.
* Used by developers or hosting services.

#### 4. **SMTP/IMAP/POP3**

* Used for sending and receiving emails.
* Example: Gmail uses SMTP to send your email.

#### 5. **WebRTC**

* Used for real-time audio/video communication between browsers.
* Example: Google Meet, Discord voice chat.

Each protocol has a purpose. TCP is reliable. UDP is fast. FTP is for files. SMTP is for email.

---

### What is HTTP?

HTTP is the normal way websites and browsers talk. It's like sending a letter:

* You (browser) write a letter (request) to a shop (server).
* The shop replies (response).
* After that, the connection closes.

**HTTP is not permanent.** Each time you need new info, you send a new request.

---

### What is a WebSocket?

**WebSocket** is a way to create a **permanent connection** between the browser and server.

* It's like a phone call that stays open.
* Both sides can speak any time.
* You don’t need to wait for a request to send a response.

#### WebSocket Handshake:

* WebSocket starts as an HTTP request.
* Then it upgrades to a WebSocket.
* This upgrade happens only once.

After that, both browser and server can send data at any time.

---

### When Do We Use WebSockets?

Use WebSockets when you need **real-time updates**.

#### Examples:

1. **Chat apps**: Messages come instantly.
2. **Live sports scores**: Score updates in real time.
3. **Online games**: Actions and moves need to be instant.
4. **Stock market feeds**: Prices change live.
5. **Collaborative tools**: Google Docs where many people write at the same time.

---

### HTTP Polling (Like LeetCode does)

When real-time is needed but WebSocket is not used, developers use **polling**:

* The browser sends HTTP requests **again and again** (like every few seconds).
* Example: "Is the result ready? Is the result ready? Is the result ready?"
* Server replies: "No", "No", "Yes".

This is **not efficient**, but easier to set up.

#### LeetCode Use Case:

* When you submit code:

  * Browser sends your code to the server.
  * Then browser keeps asking every few seconds:

    * "Did my code run?"
    * "Did I get Accepted or Failed?"
  * Server replies once it is done.

---

### Summary Table

| Feature    | HTTP                  | WebSocket              |
| ---------- | --------------------- | ---------------------- |
| Connection | Temporary             | Persistent             |
| Direction  | Client to Server only | Both ways              |
| Use Case   | Normal websites       | Real-time apps         |
| Efficiency | Repeated connection   | One-time setup         |
| Example    | Page loads, API calls | Chat, games, live feed |

---

### Bonus: Why WebSockets Rarely Used Server-to-Server

* Servers usually talk using **HTTP APIs** or **message queues**.
* WebSocket is better for browser-to-server because browsers need instant updates.
* Server-to-server often needs reliability, logging, retrying—which is easier with other tools.

---

### Conclusion

* Use **WebSocket** when you need real-time, two-way communication.
* Use **HTTP** or **polling** when you just need basic communication.
* Understand the tools and choose what works best for your use case.
