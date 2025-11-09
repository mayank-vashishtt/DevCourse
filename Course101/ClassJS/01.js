// LET VAR CHAR 

// const sakshi = "good girl"

// sakshi = "bad girl" //TypeError: Assignment to constant variable.
// const sakshi = "good boy" // SyntaxError: Identifier 'sakshi' has already been declared

// var house = "001"
// house = "002"
// console.log(house);
// var house = "003"
// console.log(house);
// here it works for all the things 


// let isdone = true;
// isdone = false;
// console.log(isdone)
// let isdone = 0 //SyntaxError: Identifier 'isdone' has already been declared

//DATA TYPES in JS 
/*

there are 2 types of kingdoms -- primitive and non primitive  

primitive -- are values not objects

Primitive datatypes: 

1)Number 
let a = 21;
let b = 21.213;


console.log(typeof a) // number
console.log(typeof b) // number


2 complex problems: 

floating-point choas: floating-point precision issue
console.log(0.1+0.2 == 0.3) // we got false
console.log((0.1 + 0.2).toFixed(1) == 0.3); // true
we concluded decimal math is not that accurate 


special number values ? 
Infinity 
-Infinity
NaN  --- not a number -- represent un numbers ko unrepsentable 
console.log(typeof(-Infinity))
console.log(typeof(Infinity))
console.log(typeof(NaN))
console.log(typeof(NaN))



JS cannot safely represent integer above this
console.log(Number.MAX_SAFE_INTEGER)//9007199254740991. 



type conversion:: 



//here we are trying to convert string to number
// console.log(parseInt("213asdc")); //213
// console.log(Number("213asdc")) // NaN

// console.log("10" + 2) // 102
// console.log("10" - 2) // 8
// console.log(10/0) //Infinity
// console.log(Number(true)) //1
// console.log(Number(false)) //0
// console.log(Number(null))//0
// console.log(Number(undefined)) // NaN
// console.log(typeof null) // object
// console.log(typeof undefined) // undefined
// console.log(typeof object) // undefined
// console.log("10" * 2)  // 20


//String



// a string represented text
// it must be written inside 
// " " ' ' ` `

// // slice -- string 
// let name = "mayank vashisht"
// console.log(name.length)
// console.log(name[12]);
// console.log(name.slice(3,12))
// substr, substr(start, length) 

//boolean 
//undefined 
// let x; //undefined
// console.log(x)

// //null
// typeof null -- object -- bug js 

//bigInt -- store above value than /9007199254740991.  
//Symbol -- unique token, perfect for hideen object keys 
// let key = Symbol("sakshi is a singer")
// console.log(key)




NON primitive datatypes 



object 

let obj = {
    name: "Sakshi",
    age: 23,



}


let obj = {
    name: "Sakshi",
    age: 23,

}

console.log(obj)

//mutable

//array  -- let arr = [1,2,3,4,,5,56];
//function 


*/

// primitives are immutable
// let a = "abc"
// // you cannot change individual characters.
// a[1] = "sa"

// console.log(a)


// // Passed by valye vs reference
// primitive -- value 
// non primitive -- refernce 

// // diff between null--object and undefined  -- undefined 
// console.log(null) // null
// console.log(undefined) //undefined

