# Browser Storage: LocalStorage, SessionStorage, Cookies

A complete beginner-to-advanced guide for understanding all three types of browser storage, how they work, their use-cases, and security considerations.

---

# 1. What is Browser Storage?

Browser storage refers to different places in the web browser where websites can save data on the user's device. This data can be temporary, long-term, or used for communication with the server.

We mainly have **three** types:

- **localStorage**
- **sessionStorage**
- **cookies** (session, persistent, HttpOnly)

Each exists for a different purpose.

---

# 2. localStorage

### **What it is:**

A persistent key-value storage mechanism provided by browsers. Data is stored as strings and does **not** automatically delete unless explicitly cleared by JavaScript or the user (via browser settings or cache clearing).

### **Key Properties:**

- Persists after browser close and device restart
- Data is scoped per domain and protocol (http/https)
- JavaScript can access it from any page on the same origin
- Size limit: typically 5–10 MB per domain (varies by browser)
- Data is never sent automatically to the server with requests
- Only string data is stored (objects must be serialized with JSON.stringify)

### **Use Cases:**

- Storing user interface preferences (e.g., dark mode, language)
- Caching non-sensitive data for offline use
- Saving progress in browser-based games
- Remembering recently viewed items or search history
- Reducing server requests by caching API responses (non-sensitive)

### **Example:**

```js
// Save a value
localStorage.setItem("theme", "dark");

// Retrieve a value
const theme = localStorage.getItem("theme");

// Remove a value
localStorage.removeItem("theme");

// Clear all localStorage for this domain
localStorage.clear();

// Store an object (must serialize)
const user = { name: "Alice", age: 25 };
localStorage.setItem("user", JSON.stringify(user));
const userObj = JSON.parse(localStorage.getItem("user"));
```

### **Security Notes:**

- Vulnerable to **Cross-Site Scripting (XSS)** attacks: if an attacker injects JavaScript, they can read or modify localStorage
- Never store sensitive data (passwords, tokens, personal info)
- Data is accessible to all scripts running on the same origin
- Not protected from browser extensions or malware
- Not suitable for authentication or authorization data

---

# 3. sessionStorage

### **What it is:**

Temporary key-value storage for the lifespan of a single browser tab or window. Data is lost when the tab or window is closed, and is not shared between tabs, windows, or browser sessions.

### **Key Properties:**

- Data is deleted when the tab or window is closed (not just refreshed)
- Not shared between tabs or windows, even if they are from the same site
- JavaScript can access it from the same tab and origin
- Size limit: typically 5 MB per domain (varies by browser)
- Data is not sent to the server with requests
- Only string data is stored (objects must be serialized)

### **Use Cases:**

- Multi-step forms (e.g., checkout or registration wizards)
- Temporary filters, selections, or UI state that should not persist after tab close
- Storing data that should be isolated to a single tab (e.g., in-progress drafts)
- Preventing data leakage between tabs (e.g., for security or privacy)

### **Example:**

```js
// Save a value
sessionStorage.setItem("step", "2");

// Retrieve a value
const step = sessionStorage.getItem("step");

// Remove a value
sessionStorage.removeItem("step");

// Clear all sessionStorage for this tab
sessionStorage.clear();

// Store an object (must serialize)
const tempData = { page: 1, answers: ["A", "B"] };
sessionStorage.setItem("quiz", JSON.stringify(tempData));
const quizData = JSON.parse(sessionStorage.getItem("quiz"));
```

### **Security Notes:**

- Same security risks as localStorage: vulnerable to XSS attacks
- Never store sensitive or confidential data
- Data is accessible to all scripts running in the same tab and origin
- Not protected from browser extensions or malware
- Not suitable for authentication or authorization data

---

# 4. Cookies

Cookies are small key-value data pieces stored by the browser, designed for both client-side and server-side use. Cookies can be sent to the server with every HTTP request, depending on their configuration.

### Key Properties:

- Size limit: about 4 KB per cookie (including name, value, and attributes)
- Each domain can store a limited number of cookies (usually 20–50)
- Cookies can be set with various attributes: `expires`, `max-age`, `path`, `domain`, `secure`, `HttpOnly`, `SameSite`
- Cookies can be accessed by JavaScript (unless `HttpOnly` is set) and/or sent automatically to the server
- Cookies are included in every HTTP request to the matching domain/path unless marked `Secure` (HTTPS only) or restricted by `SameSite`
- Can be set by both client-side JavaScript and server-side HTTP headers

Cookies come in three major types:

---

## 4.1 Session Cookies

- Temporary cookies that are deleted when the browser is closed (not just the tab)
- Automatically sent to the server with every request to the matching domain/path
- Used for basic login sessions, shopping carts, and temporary state
- Created by omitting the `expires` or `max-age` attribute

---

## 4.2 Persistent Cookies

- Have an explicit expiry time (`expires` or `max-age` attribute): can last days, months, or years
- Remain stored until expiry or manual deletion by the user
- Sent automatically with requests to the matching domain/path
- Used for "Remember Me" logins, language preferences, analytics IDs, and tracking

---

## 4.3 HttpOnly Cookies (Most Secure)

- Cookies set with the `HttpOnly` attribute cannot be accessed by JavaScript (document.cookie)
- Only the browser and server can read or modify these cookies
- Sent automatically to the server with every request to the matching domain/path
- Commonly used for refresh tokens, session IDs, and other sensitive authentication data
- Should be combined with `Secure` (HTTPS only) and `SameSite=Strict` for maximum safety

### **Why HttpOnly?**

- Protects against XSS attacks: even if an attacker injects JavaScript, they cannot read or steal the cookie
- Prevents attackers from accessing authentication tokens via client-side code
- Reduces risk of session hijacking and token theft

### Example Setting a Cookie (Backend):

Example HTTP response header to set a secure, HttpOnly cookie:

```
Set-Cookie: refresh_token=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=604800;
```

Example JavaScript (for non-HttpOnly cookies):

```js
// Set a cookie (expires in 7 days)
document.cookie = "username=alice; max-age=" + 60 * 60 * 24 * 7 + "; path=/";

// Read cookies
console.log(document.cookie);
```

---

# 5. Security Comparison

| Feature              | localStorage  | sessionStorage   | Cookies                 | HttpOnly Cookies        |
| -------------------- | ------------- | ---------------- | ----------------------- | ----------------------- |
| JS can read?         | Yes           | Yes              | Yes                     | No                      |
| Auto-sent to server? | No            | No               | Yes                     | Yes                     |
| Lifetime             | Until cleared | Tab/window close | Depends (set by server) | Depends (set by server) |
| Vulnerability        | XSS           | XSS              | XSS/CSRF                | Strong protection       |
| Ideal for            | UI prefs      | Temporary data   | Settings/sessions       | Tokens/sessions         |

---

# 6. Why JWT Should NOT Be Stored in localStorage

- JavaScript can read tokens stored in localStorage
- If an attacker injects JavaScript (via XSS), they can steal tokens
- Stolen tokens allow attackers to impersonate users, access accounts, and perform malicious actions
- Tokens in localStorage are not protected from browser extensions or malware

**BEST PRACTICE:**
Store refresh tokens in HttpOnly cookies (not accessible to JavaScript), and access tokens in memory (JavaScript variable, not persistent storage). Never store sensitive tokens in localStorage or sessionStorage.

---

# 7. Modern Auth Flow (Best Practice)

1. User submits login credentials to the backend (over HTTPS)
2. Backend verifies credentials and returns a response:
   - Sets a refresh token as a secure, HttpOnly cookie (not accessible to JavaScript)
   - Returns a short-lived access token in the response body (to be stored in memory only)
3. Frontend stores the access token in a JavaScript variable (not in localStorage/sessionStorage)
4. For each API request, frontend attaches the access token in the Authorization header
5. When the access token expires, frontend calls a `/refresh` endpoint
6. Browser automatically sends the HttpOnly refresh token cookie with the request
7. Backend validates the refresh token and returns a new access token
8. If the refresh token is invalid or expired, user is logged out and must re-authenticate

---

# 8. How Big Companies Do It (Instagram / YouTube / Google)

- Never store authentication tokens in localStorage or sessionStorage
- Use multiple cookies with appropriate attributes (Secure, HttpOnly, SameSite)
- Store sensitive tokens (refresh/session) as HttpOnly cookies
- Use short-lived access tokens, stored in memory only
- Implement device, IP, and browser fingerprinting for additional security
- Rotate tokens automatically and frequently
- Monitor for suspicious activity and force re-authentication if needed

These practices provide:

- Protection against XSS (Cross-Site Scripting) attacks
- Protection against CSRF (Cross-Site Request Forgery) attacks
- Prevention of session hijacking and replay attacks

---

# 9. Final Summary

## localStorage

- Persistent, per-origin key-value storage in the browser
- Data survives browser and device restarts until explicitly cleared
- Suitable for non-sensitive data: UI preferences, cached content, game progress
- Not secure for authentication tokens or confidential information

## sessionStorage

- Temporary, per-tab key-value storage
- Data is lost when the tab or window is closed
- Useful for multi-step forms, temporary selections, or data that should not persist
- Not secure for sensitive data

## cookies

- Small key-value pairs sent to the server with every HTTP request (unless restricted)
- Can be configured for session or persistent storage, and for security (Secure, HttpOnly, SameSite)
- Essential for authentication, session management, and cross-request state
- HttpOnly cookies are the safest place for refresh/session tokens

## Best Practices

- Never store sensitive tokens in localStorage or sessionStorage
- Use HttpOnly, Secure, and SameSite attributes for cookies storing authentication data
- Store access tokens in memory only (not persistent storage)
- Regularly audit and clear unnecessary browser storage
- Always use HTTPS to protect data in transit

---

If you need a visual diagram, authentication flow map, or further explanation, request it and it can be added here.
