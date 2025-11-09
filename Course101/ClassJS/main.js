// callbacks 
// promies 
// async/await
// fetch API 

// localStorage
// session Storage 
// Web APIs

/*



what is callbacks?
A callback is a function passed as an argument to another function, 
executed later under specific conditions.

Why Callbacks?
JavaScript is single-threaded, meaning it executes code line-by-line.
Callbacks allow you to:
Handle asynchronous operations
Execute code after something completes

*/
//callback example

function printUser(userId, callback) {
  console.log("User id is: " + userId);
  

  setTimeout(() => {
    const user = { id: userId, name: "John Doe" };
    callback(user); 
  }, 2000);
}

function displayUserName(user) {
  console.log("User: " + user.name);
}

printUser(1, displayUserName);


