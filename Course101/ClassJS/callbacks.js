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


// //callback example

// function printUser(userId, callback) {
//   console.log("User id is: " + userId);
  

//   setTimeout(() => {
//     const user = { id: userId, name: "John Doe" };
//     callback(user); 
//   }, 2000);
// }

// function displayUserName(user) {
//   console.log("User: " + user.name);
// }

// printUser(1, displayUserName);



// -----------------------------

/*


Synchronous vs Asynchronous in JavaScript

------------------------------------------------------------------------------------------

Synchronous (Blocking)

JS executes one line at a time.
Next line waits until the current line finishes.
If something takes time, whole execution halts.


Asynchronous (Non-blocking)

JS starts a task but does not wait for it to finish.
It continues running other code.
When async task completes, JS comes back to it using:
callbacks
promises
async/await
Async tasks are handled with Web APIs + Event Loop + Callback Queue (browser/node).

-------------------------------------------------------------------------------------------------



callbacks ---- 
function passed into another function to call it later 

callbacks benefits: 
Enables asynchronous behaviour 




Synchronous and asynchronous diff?



*/

// function doTwice(fn){

//     fn()
//     fn()
// }

// // macx(() => {
// //     console.log("sakshi is Bengali")
// // }).
// //arrow function ? 
// //why it doesn't work 

// function macx(){
//     console.log("sakshi is Bengali")
// }

// doTwice(macx);

// //sakshi is Bengali
// //sakshi is Bengali


// //why this happens in next lec - abstraction 
// console.log("A ") --- 1

// setTimeout(() =>{
//     console.log("B ") --- 14
// },100)

// console.log("C ")--- 2

// setInterval(() => {
//     console.log("D ")
// },10) // setInterval that prints the function in specific time period  -- 4 5 6 7 8 9 10 11 12 13

// setTimeout(() =>{
//     console.log("E ")
// },1000).  --- almost nhi hoga print

// console.log("F ") --- 3


//ACFDBE => sakshi's answer; 
//

// A 
// C 
// F 
// D 1
// D 2
// D 3
// D 4
// D 5
// D 6
// D 7
// D 8
// D 9
// B 
// D 
// D 
// D 
// D 


//asynchorous callback

// console.log("A ")

// setTimeout(() =>{
//     console.log("B ")
// })

// console.log("C ")

// setInterval(() => {
//     console.log("D ")
// },1000) 

// setTimeout(() =>{
//     console.log("E ")
// },1000)

// console.log("F ") 

// setTimeout(() =>{
//     console.log("G ")
// })

// setTimeout(() =>{
//     console.log("H ")
// },0)
// A C F B G H D E D D D D D D D D D
// A 
// C 
// F 
// B 
// G 
// H 
// D 
// E 
// D 
// D 
// D 



//reading file 

const fs = require('fs');  // import statment that is necessary 


//async -- setimeout
//readfile is async function thats why it takes 3 parameter


// fs.readFile('sheet.txt','utf-8', function(err,data){
//     if(err){
//         console.error("read err",err);
//         return;
//     }
//     console.log("file readings started --- > ")
//     console.log(data);


// })


//this is sync function 

// const data = fs.readFileSync("sheet.txt", "utf8");
// console.log(data);


// console.log("sakshi sakshi ----- sakshi")


/*

caller / callee : function that calls the callback function 

high-order function: takes a function as a argument or return a function


function doTwice(fn){

    fn()
    fn()
}

function macx(){
    console.log("sakshi is Bengali")

}


doTwice(macx);

//calback function -- macx
//caller function --  doTwice


why callbacks? when are they used?  
respond to events (UI clicks, streams)
handle async 



filter/map/reduce



filter()
Used to keep only the elements that match a condition
➡️ Returns a new array (same size or smaller)



const nums = [1, 2, 3, 4, 5, 6];
const greaterThan3 = nums.filter(n => n>3)
console.log(greaterThan3)

*/

// Map()
// Used to transform each element
// Returns a new array (same size)

// const nums = [1, 2, 3, 4];
// const plus2 = nums.map(n => n + 2 )
// console.log(plus2)

// reduce()
// ➡️ Used to accumulate all values into one result
// ➡️ Returns a single value (number, object, array, anything)


// const nums = [1, 2, 3, 4];

// const sum = nums.reduce((acc, curr) => acc + curr, 0);
//acc -- treat as sum jesme har array ki value store hori h , curr is like that iteration , 0 is intial value of acc
// console.log(sum); 

// Explanation:
// acc → accumulator (stores result)
// curr → current element
// 0 → initial value of accumulator


// const product = nums.reduce((mul,n) => mul*n,1)
// console.log(product)


//UTF-8 is a variable-length Unicode encoding that represents every character (all languages, emojis) using 1–4 bytes. It’s the most common encoding used on the web.
//UTF-8 = Unicode Transformation Format – 8 bit



// Pyramid of Doom // Callback hell 

//Callback Hell is deeply nested, unreadable callback code caused by handling multiple dependent asynchronous operations.

//pyramid, messy, hard to read, and difficult to maintain.
//too many nested callbacks,

//why we need it 
//there are mutilple steps in our code and every step is depend on another step 

// for example 
// -- social meadia platform 
// get user -- get user's post --- save post -- send response

//how to fix callbacks 
//use named functions instead of making inline function 
//convert callbacks into promieses 
// use async/await 

//callback hell. {} ()
function getUser(id, callback) {
    setTimeout(() => {
        console.log("Fetched user");
        callback({ id, name: "Mayank" });
    }, 1000);
}

function getOrders(user, callback) {
    setTimeout(() => {
        console.log("Fetched orders");
        callback(["order1", "order2"]);
    }, 1000);
}

function getOrderDetails(order, callback) {
    setTimeout(() => {
        console.log("Fetched order details");
        callback("Order details for " + order);
    }, 1000);
}


// ---- Callback Hell ----
getUser(1, function (user) {
    getOrders(user, function (orders) {
        getOrderDetails(orders[0], function (details) {
            console.log(details);
        });
    });
});



//Fixed Version Using Promises

function getUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Fetched user");
            resolve({ id, name: "Mayank" });
        }, 1000);
    });
}

function getOrders(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Fetched orders");
            resolve(["order1", "order2"]);
        }, 1000);
    });
}

function getOrderDetails(order) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Fetched order details");
            resolve("Order details for " + order);
        }, 1000);
    });
}

// ---- Promise Chain ----
getUser(1)
    .then(getOrders)
    .then(orders => getOrderDetails(orders[0]))
    .then(console.log);


// ---- async/await  ----
async function run() {
    const user = await getUser(1);
    const orders = await getOrders(user);
    const details = await getOrderDetails(orders[0]);
    console.log(details);
}

run();


// Summary
// ❌ Callback Hell
// Nested callbacks
// Hard to read & maintain

// ✔ Promises
// Flat .then() chain

// ✔ async/await
// Cleanest, synchronous-like code
// Easier error handling