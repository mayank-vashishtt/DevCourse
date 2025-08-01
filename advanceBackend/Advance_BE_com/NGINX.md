### **What is NGINX?**

NGINX (pronounced "Engine-X") is an open-source **web server** that can also act as a **reverse proxy**, **load balancer**, and **HTTP cache**. It was originally designed to solve the **C10K problem** (handling 10,000 concurrent connections) efficiently using an event-driven architecture.

---

### **What does NGINX do?**

* **Serve static content** (HTML, CSS, JS, images) directly to clients.
* **Reverse proxy** for backend applications (Node.js, Django, etc.).
* **Load balancing** across multiple backend servers.
* **SSL/TLS termination** (manages HTTPS encryption/decryption).
* **Caching** static or dynamic content for performance.
* **Compression** (Gzip, Brotli) to reduce response size.

---

### **What is nginx.conf?**

`nginx.conf` is the **main configuration file** for NGINX. It defines:

* How NGINX should behave (server blocks, SSL, caching, etc.).
* Server settings (ports, domains, headers).
* Reverse proxy rules.
* Load balancing and caching policies.

---

### **What is a Reverse Proxy and Proxy Server?**

* **Proxy Server**: A server that sits between a client and the internet to forward requests. Example: A corporate proxy that filters internet traffic.
* **Reverse Proxy**: A server that sits in front of backend servers and forwards **client requests** to them. Clients do NOT know about backend servers.

**Use in NGINX**:

* NGINX often acts as a reverse proxy to hide backend servers, improve security, and enable load balancing.

---

### **Does NGINX work as a Load Balancer? What is a Load Balancer?**

Yes. **Load Balancer** distributes incoming requests across multiple backend servers to:

* Prevent overload.
* Improve performance.
* Increase availability.

**NGINX Load Balancing Algorithms**:

* Round Robin (default).
* Least Connections.
* IP Hash.

---

### **What is Apache? How is NGINX different from Apache?**

**Apache**:

* Process-based architecture (spawns a new process/thread for each request).
* Older but highly configurable.

**NGINX**:

* Event-driven (handles many connections in a single thread).
* Faster for static files and high concurrency.
* Lower memory footprint.

---

### **Explain this nginx.conf block:**

```nginx
server {
    listen 443 ssl;   # Listen on port 443 (HTTPS) with SSL enabled
    server_name api.globio.ai;  # Domain name for this server block

    ssl_certificate /etc/nginx/ssl/certificate.crt;      # SSL certificate file path
    ssl_certificate_key /etc/nginx/ssl/private.key;      # SSL private key path

    ssl_protocols TLSv1.2 TLSv1.3;   # Allow only secure TLS versions
    ssl_prefer_server_ciphers on;    # Use server's preferred ciphers
    ssl_ciphers HIGH:!aNULL:!MD5;    # Strong ciphers only (avoid weak ones)

    location / {
        proxy_pass http://backend:3000;   # Forward all requests to backend service on port 3000
        proxy_set_header Host $host;      # Pass original host header
        proxy_set_header X-Real-IP $remote_addr; # Client's real IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # Chain of IPs through proxies
        proxy_set_header X-Forwarded-Proto $scheme; # HTTP or HTTPS info
    }
}
```

**What is happening here?**

* NGINX listens on port 443 (HTTPS).
* It uses SSL/TLS certificates for encryption.
* For all incoming requests, it acts as a reverse proxy and forwards them to the backend running on `http://backend:3000` (Docker Compose service name).
* Adds headers so backend knows the real client IP and protocol.

---

### **What is Caching in NGINX? Why do we need it?**

**Caching** means storing a copy of a response so future requests can be served faster without hitting the backend.

**Benefits**:

* Reduces server load.
* Improves speed for users.
* Handles traffic spikes.

**In NGINX**:

* `proxy_cache` directive stores responses from backend for a set time.

Example:

```nginx
proxy_cache_path /tmp/cache keys_zone=my_cache:10m;
location /api/ {
    proxy_cache my_cache;
    proxy_pass http://backend;
}
```

---

### **What is SSL Termination? Why in NGINX?**

* **SSL/TLS Termination**: Decrypting HTTPS traffic at NGINX before sending to backend.

**Why needed?**

* Offloads encryption/decryption from backend (reduces CPU load).
* Centralized certificate management.

**How it works in NGINX**:

* NGINX handles SSL handshake and decrypts data.
* Sends plain HTTP to backend (or re-encrypts if needed).

---

### **What is TLS?**

TLS (Transport Layer Security) is the successor of SSL. It provides **secure communication** over HTTP (HTTPS). TLS 1.2 and 1.3 are current standards.

---

### **Compression in NGINX**

NGINX supports **Gzip** and **Brotli** compression to reduce the size of responses sent to clients.

Example:

```nginx
gzip on;
gzip_types text/plain application/json text/css;
```

**Why use it?**

* Saves bandwidth.
* Speeds up page load time.

---

✅ NGINX = Web Server + Reverse Proxy + Load Balancer + SSL Termination + Caching + Compression.

