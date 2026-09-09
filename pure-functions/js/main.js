"use strict";
// Pure Functions
// A part of the FUnctional Programming Paradigm
// Why write Pure FUnctions
// 1) Clean Code
// 2) Easy to test
// 3) Easy to debug
// 4) Decoupled and Independent
// 5) Could be added to your utility functions

// Rules for Pure Functions:
// 1) The same input ALWAYS gives the same output
// 2) No side effects

// Let's breakk this down with examples
// 1) The same input ALWAYS gives the same output

const add = (x, y) => x + y;
console.log(add(2, 3));

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Deborah", "Allaputa"));

// We can replace the function with the output
// This is called "referencial transparency"

// A pure function should have at least one parameter
// Otherwise, it is the same as a constant because they can only work with their input.
// A pure function should'nt work with data that is not provided as an input parameter
// E.g const firstName = () => "Deborah" can be written as const firstName = "Deborah" instead

// 2) No side effects
// This also means accessing the scope outside the function makes the function impure
let z = 5;
const sum = (x, y) => x + y + z;
console.log(sum(2, 7));
z = 2;
console.log(sum(2, 7));

// Pure functions cannot:
// Access a database, API, file system, storage, etc.
// Modify the DOM
// Or even log to the console
// That said, clearly impure functions are necessary but they are harder to test and debug
// Futher, no input state can be modified when we write a pure function
// That is, no data should be "mutated"
// Consider all input data to be immutable

// Impure Example 1
let x = 1;

const increment = () => (x += 1);
console.log(increment());
console.log(x);

// Impure example 2

const myArray = [1, 2, 3];

const addToArray = (array, data) => {
  array.push(data);
  return array;
};

console.log(addToArray(myArray, 4));
console.log(myArray);

// Refactored Example 1:
const pureIncrement = (num) => (num += 1);
console.log(pureIncrement(x));
console.log(x);

// Refactored Example 2:
const pureAddToArray = (array, data) => [...array, data];
console.log(pureAddToArray(myArray, 8));
console.log(myArray);

// Also notice how pure functions always return something.
// No return means you definitely do not have a pure function.

// I may have already been working with some great examples of Pure Functions and not realized it.
// These common Higher Order Functions are Pure Functions;
const oneToFive = [1, 2, 3, 4, 5];
const oddToFive = oneToFive.filter((elem) => elem % 2 !== 0);
console.log(oddToFive);
const doubled = oneToFive.map((elem) => elem * 2);
console.log(doubled);
const summed = oneToFive.reduce((sum, elem) => sum + elem);
console.log(summed);
console.log(oneToFive);

// The goal: Write small, pure function when you can for code that is clean, easy to test, easy to debug
