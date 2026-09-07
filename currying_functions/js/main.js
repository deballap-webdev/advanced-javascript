// Currying
// Named after Huskell B. Curry
// Concept from lambda calculus

// Currying takes a function that receives more than one paramter and breaks it into a series of unary (one parameter) functions

// Therefore, a curried function only takes one parameter at a time.

// Currying can look like this:
const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      return `${ingredient1}, ${ingredient2}, ${ingredient3}`;
    };
  };
};

console.log(buildSandwich("Bacon")("Spinash")("Sardine"));

// It Works but thats getting ugly and nested the futher we go
// Let's refactor

const buildSammy = (ingred1) => (ingred2) => (ingred3) =>
  `${ingred1}, ${ingred2}, ${ingred3}`;
console.log(buildSammy("Bread")("Chicken")("Lettuce"));

// Another Example of a Curried Function

const multiply = (x, y) => x * y;
const curriedMultiply = (x) => (y) => x * y;
console.log(curriedMultiply(4)(5));
console.log(multiply(4, 5));
console.log(curriedMultiply(3));

// Partially applied functions are a common use of curring
const timesTen = curriedMultiply(10);
console.log(timesTen);
console.log(timesTen(8));

// Another Example
const updateElemText = (id) => (content) =>
  (document.getElementById(`${id}`).textContent = content);
const updateHeaderText = updateElemText("header");
console.log(updateHeaderText);
console.log(updateHeaderText("Hello Debbie!"));
// Another common use of curryig is function composition
// Allows calling small functions in a specific order
const addCustomer =
  (fn) =>
  (...args) => {
    console.log("saving customer info...");
    return fn(...args);
  };
const processOrder =
  (fn) =>
  (...args) => {
    console.log(`processing order #${args[0]}`);
    return fn(...args);
  };
let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed`);
};
completeOrder = processOrder(completeOrder);
console.log(completeOrder);
completeOrder = addCustomer(completeOrder);
console.log(completeOrder);
completeOrder(1000);

function addCustomer(...args) {
  return function processOrder(...args) {
    return function completeOrder(...args) {
      //end
    };
  };
}
