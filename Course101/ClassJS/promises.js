//promises

/*
why do we need promises?
we need promises beacause callbacks are hell 
callbacks are: 
hard to read 
hard to maintain 
hard to handle err 
knows as callbacks hell 

promises solve this all by giving us cleaner chainable way to handle async code


what is Promises ? 
-promises are an object  -- {..........} 
-represents future value 
-value can come now/later/never
-it has 3 states

3 states of promises: 
pending 
fulfilled 
rejected 



*/

//how to create a promise 

// resolve() -- promise fulfilled 
// reject() -- promise rejected 



// const p = new Promise(function(resolve,reject){

//     setTimeout(()=>{
//         console.log("hello ")
//         resolve("Task done")
//         // reject("some err")
//     },1000);
// })

// console.log(p)


// const p = await new Promise(function(resolve,reject){

//     setTimeout(()=>{
//         console.log("hello ")
//         resolve("Task done")
//         // reject("some err")
//     },1000);
// })

// console.log(p)



// ORIGINAL-ish base (sync + timers)
console.log("A");

setTimeout(() => {
  console.log("B (setTimeout default/0)");
}); // 0 ms

console.log("C");

// repeating timer
const intervalId = setInterval(() => {
  console.log("D (setInterval, every 1000ms)");
}, 1000);

setTimeout(() => {
  console.log("E (setTimeout 1000ms)");
}, 1000);

console.log("F");

setTimeout(() => {
  console.log("G (setTimeout default/0)");
});

setTimeout(() => {
  console.log("H (setTimeout 0 explicit)");
}, 0);

// -----------------------------
// PROMISES & microtasks
// -----------------------------

// Promise executor runs synchronously
const p0 = new Promise((resolve) => {
  console.log("Promise executor (p0) runs sync");
  // resolve later inside timer to show async resolution
  setTimeout(() => resolve("p0 done"), 10);
});

// simple microtask
Promise.resolve().then(() => {
  console.log("P1: Promise.resolve().then (microtask)");
});

// nested promise chain (microtasks inside microtasks)
Promise.resolve()
  .then(() => {
    console.log("P2: then start");
    return Promise.resolve("inner value").then((v) => {
      console.log("P2: inner then ->", v);
    });
  })
  .then(() => {
    console.log("P2: then end");
  });

// an async function showing await behaviour
(async function asyncDemo() {
  console.log("asyncDemo: start (sync part)");
  await Promise.resolve(); // yields to microtasks, but resolved promise causes microtask scheduling
  console.log("asyncDemo: after first await (runs as microtask)");
  await new Promise((r) => setTimeout(r, 0)); // yields to next macrotask (timer)
  console.log("asyncDemo: after await timer (runs in later macrotask)");
})();

// promise resolved inside 10ms (p0).then -> will run as microtask after that macrotask completes
p0.then((v) => {
  console.log("p0.then ->", v);
});

// -----------------------------
// Promise combinators (race / allSettled) for complexity
// -----------------------------
const pA = new Promise((res) => setTimeout(() => res("pA resolved (50ms)"), 50));
const pB = new Promise((_, rej) => setTimeout(() => rej("pB rejected (30ms)"), 30));

console.log("sakshi")

Promise.race([pA, pB])
  .then((r) => console.log("Promise.race resolved ->", r))
  .catch((err) => console.log("Promise.race rejected ->", err));

Promise.allSettled([pA, pB]).then((results) => {
  console.log("Promise.allSettled ->", results);
});

console.log("mayank")
// stop the interval after a few runs so program can finish in Node
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Cleared interval");
}, 3100);



// // --------- another ques ---------
// console.log("A");

// setTimeout(() => {
//     console.log("B");
// });

// console.log("C");

// setInterval(() => {
//     console.log("D");
// }, 1000);

// setTimeout(() => {
//     console.log("E");
// }, 1000);

// console.log("F");

// setTimeout(() => {
//     console.log("G");
// });

// setTimeout(() => {
//     console.log("H");
// }, 0);

// // ------------------------------
// // SIMPLE PROMISE EXAMPLES
// // ------------------------------

// // Promise 1 (microtask)
// Promise.resolve().then(() => {
//     console.log("P1 (Promise.resolve)");
// });

// // Promise 2 (executor is sync)
// const p = new Promise((resolve) => {
//     console.log("P2 executor runs (sync)");
//     resolve("P2 done");
// });
// p.then((v) => console.log(v));

// // Promise 3 (async resolve)
// new Promise((resolve) => {
//     setTimeout(() => resolve("P3 done after timeout"), 500);
// }).then((v) => console.log(v));
