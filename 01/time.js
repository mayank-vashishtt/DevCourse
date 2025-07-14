// // console.log(date()); gives error because date is not defined
 

// // js have built in object called date 
// console.log(new Date());


// const d1 = new Date(); 

// console.log(d1); // current date and time
// console.log(d1.getFullYear()); // get the year
// console.log(d1.getMonth()); // get the month (0-11)
// console.log(d1.getDate()); // get the date (1-31)
// console.log(d1.getDay()); // get the day of the week (0-6)
// console.log(d1.getHours()); // get the hours (0-23)
// console.log(d1.getMinutes()); // get the minutes (0-59)
// console.log(d1.getSeconds()); // get the seconds (0-59)
// console.log(d1.getMilliseconds()); // get the milliseconds (0-999)
// console.log(d1.getTime()); // get the time in milliseconds since 1970-01
// console.log(d1.toISOString()); // get the date in ISO format
// console.log(d1.toDateString()); // get the date in a readable format
// console.log(d1.toTimeString()); // get the time in a readable format
// console.log(d1.toLocaleString()); // get the date and time in a locale format
// console.log(d1.toLocaleDateString()); // get the date in a locale format



// Timers in JavaScript

// timers are that thing in js that help us to run a function after a certain time

// setTimeout(() => {
//     console.log("set time out 1");
// },0); 
// add(); // Function call
// console.log("log 1"); 
// setInterval(() => {
//     console.log("set interval ");
// },0); 
// function add() {
//     console.log("add");
// }
// const myPromise = new Promise((resolve, reject) => {
//     console.log("Promise  1 is being created..."); 
// });
// console.log("log2");
// add();
// setTimeout(() => {
//     console.log("set time out 2");
// },0); 
// const myPromise2 = new Promise((resolve, reject) => {
//     console.log("Promise 2 is being created..."); 
// });
// add();


///this is from the topic EVENT LOOP 



// setTimeout(() => console.log("A"), 0);

// Promise.resolve().then(() => {
//   console.log("B");
//   setTimeout(() => console.log("C"), 0);
// });
 
// console.log("D");

// queueMicrotask(() => {
//   console.log("E");
// });

// setTimeout(() => {
//   console.log("F");
//   Promise.resolve().then(() => console.log("G"));
// }, 0);

// Promise.resolve().then(() => {
//   console.log("H");
//   queueMicrotask(() => console.log("I"));
// });

// console.log("J");

// D J B E H I A F G C



// uses  macrotasks and microtasks to understand the event loop
/*






*/


// queueMicrotask(() => {
//   console.log("E");
// });


// function add(){
//     console.log("hello people");
// }

// const asd = () => {
//     console.log("hello people");
// }   