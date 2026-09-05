// Foundational knowledge for Writing Pure Functions
// Javascript Data Types
// Primitive vs Structural

/* Primitive:
1) undefined
2) Boolean
3) String
4) Number
5) BigInt
6) Symbol */

/* Structural:
1) Object: (new) Object, Array, Set, Date, WeakMap, Map
2) Function
 */

// Value vs Reference
// Primitive Pass Value

let x = 2;
let y = x;
y += 3;
console.log(y);
console.log(x);

// Structural types use references
let xArray = [1, 2, 3];
let yArray = xArray;

yArray.push(4);
console.log(yArray);
console.log(xArray);

// Mutable vs Immutable

// Primitives are immutable
let myName = "Debbie";
myName[0] = "W"; // nope!
console.log(myName);

// Reassignment is not the same as mutable
myName = "Deborah";
console.log(myName);

// Structures contain mutable data
xArray[0] = 9;
console.log(yArray);
console.log(xArray);

// Pure functions require you to avoid mutating the data
// Impure function that mutates the data

const addToScoreHistory = (array, score) => {
  array.push(score);
  return array;
};

const scoreArray = [44, 22, 19];

console.log(addToScoreHistory(scoreArray, 6)); //mutates the original array
// This is considered to be a side-effect.
// notice const doesn't make the array immutable (Immutabiity not same as reassignment)
// We need to modify our function so it does not mutate the original data.
// Shallow copy vs. Deep copy (clones)

// Shallow Copy
// With the spread operator
const zArray = [...yArray];
yArray[2] = 56;
console.log(zArray);
console.log(yArray);
console.log(xArray);
console.log(xArray === yArray);
console.log(yArray === zArray);

// With Object.assign()
const tArray = Object.assign([], zArray);
console.log(tArray);
console.log(tArray === zArray);
tArray.push(22);
console.log(tArray);
console.log(zArray);

// But if there are nested arrays or objects...
yArray.push([8, 9, 10]);
console.log(yArray);
const vArray = [...yArray];
console.log(vArray);
vArray[4].push(5);
console.log(vArray);
console.log(yArray);
// nested structural data types still share a reference!
// Note: Array.from() and slice() create shallow copies, too

// When it comes to objects, what about...Object.freeze() ??
const scoreObj = {
  first: 44,
  second: 12,
  third: { a: 1, b: 2 },
};
Object.freeze(scoreObj);
scoreObj.third.a = -8;
console.log(scoreObj);
// still mutates - it is a shallow freeze

// Deep copy is need to avoid this with structural data types
// Several libraries like lodash, Ramda and others have this feature built-in

// This is a one line vanilla js solution but note it does not work for undefined, Dates, functions, Infinity, RegExps, Maps, Sets, Blobs, FileLists, ImageDatas and other complex data types

const newScoreObj = JSON.parse(JSON.stringify(scoreObj));
console.log(newScoreObj);
console.log(newScoreObj === scoreObj);

// instead of using a library here is a vanilla js function

const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;
  // create an object or array to hold the values
  const newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    const value = obj[key];
    // recursive call for nested objects and arrays
    newObj[key] = deepClone(value);
  }

  return newObj;
};

const myScoreObj = deepClone(scoreObj);
scoreObj.third.a = 9;
console.log(myScoreObj === scoreObj);
console.log(myScoreObj);
console.log(scoreObj);

// Now we can make a pure function
const pureAddToScoreHistory = (array, score, cloneFunc) => {
  const newArray = cloneFunc(array);
  newArray.push(score);
  return newArray;
};

const pureScoreHistory = pureAddToScoreHistory(scoreArray, 18, deepClone);

console.log(pureScoreHistory);
console.log(scoreArray);
console.log(pureScoreHistory === scoreArray);
