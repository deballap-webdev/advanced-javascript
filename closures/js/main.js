/* // Lexical scope defines how variable names are resolved in nested functions.
// Nested (child) functions have access to the scope of their parent functions.
// This is often confused with closure, but lexical scope is only an important part of closure.
// w3schools: "A closure is a function having access to the parent scope, even after the parent function has closed."
// A closure is created when we define a function, not when a function is executed.

// global scope
let x = 1;

const parentFunction = () => {
  //local scope
  let myValue = 2;
  console.log(x);
  console.log(myValue);

  const childFunction = () => {
    console.log((x += 5));
    console.log((myValue += 1));
  };
  //childFunction();
  return childFunction;
};

const result = parentFunction();
console.log(result);
result();
result();
result();
parentFunction();
result();

console.log(x);
//console.log(myValue); // reference error, private variable

// Another Example IIFE (Immediately Invoked Function Expression)

const privateCounter = (() => {
  let count = 0;
  console.log(`iniial value: ${count}`);
  return () => {
    count += 1;
    console.log(count);
  };
})();

privateCounter();
privateCounter();

 */

// More Examples With IIFE
const credits = ((num) => {
  let credits = num;
  console.log(`initial credits value : ${credits}`);
  return () => {
    credits -= 1;
    if (credits > 0) {
      console.log(`playing game, ${credits} remaining`);
    }
    if (credits <= 0) {
      console.log(`not enough credits`);
    }
  };
})(5);
credits();
credits();
credits();
credits();
credits();
