// xyz has done MERN stack 
/*
localStorage
// session Storage 
// Web APIs

// Async tasks are handled with event loop, microtask vs macrotask, async/await flow tell me all that promise 
will do it later. 




what is middle-wares ? 
Don't Repeat Yourself" (DRY) principle
*/


/*

Middleware = a function that runs between the client request  and the server response 



client.  FE se BE   --->     request   {it run here} --->   server
client                       <---   server {it doesnt run here}
 

Middleware Function Structure

*/

// function middlewareName(req, res, next) {

//   // do something (log, check auth, parse, etc.)

//   next(); // go to the next middleware or route
// }

//eske baad agla koi aur middleware ho skta h 
//ya route ho skta jeska middlware h 
// to terko agr jana h to tu next() call krna is mandatory 
// agr if you dont call it 
// to ye essi function pr stop hojayega aur aage ni jayega
//FE vo client ko load hota he dikhayega 


// How to Use Middleware

/*

for all routes (global middleware)
for specific routes 
for one route 
and we have to use more than one middleware for one route 
and we have to use more than one middleware for many route 
and we have to use more than one middleware for all route 

*/

// For All Routes (Global Middleware)


// Use app.use().

const express = require('express');
const app = express();

// global middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.get('/',(req, res) => res.send('Home')); // esme bhi use hora h 
app.get('/about', (req, res) => res.send('About')); // esme bhi hoga 
//This middleware runs for every route.


//if my req is like usme hmesha username aara h 
// aur i want ki username hmesha sakshi ho to mene ek global middleware bna diya
//jo hr req ka username check krta h ki sakshi h ya nhi 
// agr sakshi h to it says u can go ahead vrna stop krdeta h 
// this is some sort of application smjha aaya ? 


// tune sbse app.use((req, res, next)


// app.use(express.json()) // hum esse hmesha lekhte h // global 
// cors() -- uska hota h ki vo kch he FE url ko access krne ko de BE routes ko 
// Read the incoming request body (the raw JSON data)
// Parse it into a JavaScript object
// Attach it to req.body
// → So your routes can easily access it.


// //For Specific Routes
// function checkAuth(req, res, next) {
// //   const token = req.headers.authorization; // TCP(https, http) UDP pr    otocols 
//   const username = req.body; //array[2]
//   if (username === 'Sakshi'){
//     next();
//   }
//   else {res.status(401).send('Unauthorized')};
// }

// // middleware me sbse imp kya hota -- next ko call krna 

// // only for /dashboard
// app.get('/dashboard', checkAuth, (req, res) => {
//   res.send('Welcome to Dashboard');
// });


// ) For a Group of Routes

// const router = express.Router();

// router.use(checkAuth); // all routes in this router are protected

// router.get('/profile', (req, res) => res.send('Profile'));
// router.get('/settings', (req, res) => res.send('Settings'));

// app.use('/sakshi/user', router); // mount at /user

//BE running at port 3000 
// https://localhost:3000/sakshi/user/profile



//When a Route Has Multiple Middleware

// function m1(req, res, next) {
//   console.log('First');
//   next();
// }

// function m2(req, res, next) {
//   console.log('Second');
//   next();
// }

// app.get('/test', m1, m2, (req, res) => {
//   console.log('Route handler');
//   res.send('Done');
// });


// what if you have to use multiple middleware at every route ? 


// const router = express.Router();

// // Apply multiple middleware to entire router
// router.use(m1, m2);

// router.get('/profile', (req, res) => {
//     res.send('Profile');
// });
// router.get('/settings', (req, res) => {
//     res.send('Settings');
// });

// app.use('/user', router);





// next() Keyword:
/*

In middleware functions in Express, 
next is a callback function that is used to pass control to the next middleware 
function in the stack. When you call next(), 
it tells Express to move to the next middleware in line. 
If next() is not called within a middleware function, the request-response cycle stops, 
and the client receives no response.

*/


// Difference between res.send and res.json:

//  Sends a response of various types (string, Buffer, object, etc.).
//  Express tries to guess the content type based on the data provided.

// res.send('Hello, World!'); // Sends a plain text response


// Sends a JSON response. It automatically sets the Content-Type header to application/json.




//  Importance of app.use(express.json()):
/*
app.use(express.json()) is middleware that parses incoming JSON payloads in the request body. 
It is crucial when dealing with JSON data sent in the request body, 
typically in POST or PUT requests. Without this middleware,
you might receive the JSON data as a raw string, and you'd need to manually parse it.

*/



/*


What happens when a request comes to your server
client  --- request --> server 
When a client (like a browser or React app) sends a request to Express,
part of that request 

req.headers.authorization 
req.query 
req.body
headers --> Metadata about the request , Content-Type, Authorization, etc.
query --> Data in the URL after ? /search?name=mayank&age=20
body --> Data sent inside the request, { "username": "mayank" }

How Express handles them internally


1) req.headers
Headers are always text-based
Express automatically reads them.
No special middleware needed.

app.get('/', (req, res) => {
  console.log(req.headers);
});
//They are part of the HTTP protocol, so Express already knows how to read them.



2)req.query
Query parameters come from the URL, not from the body // Uniform Resource Locator
Express automatically parses them into a JavaScript object.

// Example: GET /search?name=mayank&age=22

app.get('/search', (req, res) => {
  console.log(req.query); // { name: 'mayank', age: '22' }
});
//no middleware required because they’re visible right in the URL string.




3)req.body
The body is not visible in the URL
It’s hidden inside the HTTP request and comes as raw data (bytes or text).

When Express receives this:
It sees raw bytes of text, like:
Express does not automatically know how to turn that into a JS object.
Why middleware like express.json() is needed

app.use(express.json())
app.post('/login', (req, res) => {
  console.log(req.body); // ✅ { username: 'mayank', password: '123' }
});



Without express.json(), req.body would be:
undefined
app.post('/login', (req, res) => {
  console.log(req.body); //undefined
});

*/



/*

Client → Express (req) → Middleware(s) → Route Handler → Server → Response (res) → Client
res.send() -- text -- res.send("Hello")
res.json() -- json object -- res.json({ success: true })
res.status()  -- status code -- res.status(404).send("Not found")


1xx -- informational -- request received, continuing process
2xx -- success  --- sb bdiya h 
3xx -- redirection --- resource moved somewhere else
4xx -- client err --- client ne koi glti kri h -- bad request
5xx -- server error -- server fail 

*/




// Global Catches:
// it is. a Error-Handling Middleware
// It’s a special middleware in Express 
// that’s designed to catch any error that happens anywhere 
// in your routes or other middleware — and respond gracefully.

// (err, req, res, next)

app.use((err, req, res, next) => {
  console.error('Error caught:', err.message);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

app.get('/user', (req, res) => {
  throw new Error("Something went wrong!");
});

// terminal --- Error caught: Something went wrong!

// client --- { "error": "Something went wrong on the server!" }



/*
Why it’s called a “Global Catch”
Because it can catch any error, from anywhere in your app

That extra err at the beginning tells Express:
“Hey, this is for handling errors.”

Sometimes you don’t “throw” an error — you just call next(err) manually.
app.get('/product', (req, res, next) => {
  const err = new Error("Product not found");
  next(err); // sends it to the global error handler
});



// */

// const express = require('express');
// const app = express();

// app.get('/user', (req, res, next) => {
//   const err = new Error("User not found");
//   next(err); // pass the error
// });

// app.get('/test', (req, res) => {
//   throw new Error("Testing error"); // throw directly
// });

// // Global Error Handler — last middleware
// app.use((err, req, res, next) => {
//   console.error('Error caught:', err.message);
//   res.status(500).json({ error: err.message });
// });

// app.listen(3000, () => console.log('Server running'));



//Input Validation:


// 1. Naive Way - Multiple If-Else Statements:

// const express = require('express');
// const app = express();

// app.use(express.json());

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || typeof username !== 'string' || username.length < 3 ||
//       !password || typeof password !== 'string' || password.length < 6) {
//     return res.status(400).json({ error: 'Invalid input.' });
//   }

//   // Proceed with authentication logic
//   // ...

//   res.json({ success: true });
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


//2. using library validation krte h 
// zod library 

// const express = require('express');
// const { z } = require('zod');
// const app = express();

// app.use(express.json());

// const loginSchema = z.object({
//   username: z.string().min(3),
//   password: z.string().min(6),
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   try {
//     loginSchema.parse({ username, password });
//     // Proceed with authentication logic
//     // ...
//     res.json({ success: true });
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid input.', details: error.errors });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

//Zod:


/*
Zod is a TypeScript-first schema declaration and validation library.
it provides a simple and expressive way to define the structure and constraints 
of your data, allowing you to easily validate and parse input against those specifications. 


Here's a brief explanation of Zod and its syntax:

Zod Syntax Overview:
Zod provides basic types such as string, number, boolean, null, undefined, etc.
const schema = z.string();

You can define the structure of an object using the object method and specify the shape of its properties.
const userSchema = z.object({
  username: z.string(),
  age: z.number(),
});


const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
});

const userSchema = z.object({
  username: z.string(),
  address: addressSchema,
});

const numbersSchema = z.array(z.number());



Why Zod:
TypeScript-First Approach: Zod is designed with TypeScript in mind, providing strong type-checking and autocompletion for your schemas.
Concise and Expressive Syntax: Zod's syntax is concise and expressive, making it easy to define complex data structures with minimal code.
Validation and Parsing: Zod not only validates data but also automatically parses it into the expected TypeScript types.
Rich Set of Features: Zod includes a variety of features, such as custom validation, optional and nullable types, union and intersection types, making it a powerful tool for data validation in your applications.

*/