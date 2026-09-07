// Official Definition of Recursion
// In computer science, recursion is a method of solving problems where the solution depends on solution to smaller instances of the same problem.

// Unofficial Definition of Recursion:
// "Any situation where you do something, and depending on the reults, you might do it again."

// In programming, recursion occurs when a function calls itself.

// Any iterator function (aka function with a loop) can be recursive instead.

// Iterator function

const countToTen = (num = 1) => {
  while (num <= 10) {
    console.log(num);
    num++;
  }
};

const recurToTen = (num = 1) => {
  if (num > 10) return;
  console.log(num);
  num++;
  recurToTen(num);
};

// recursive function have 2 parts:
// 1) the recursive call to the function
// 2) at least one condition to exit

// "With Great Power Comes Great Responsibility"
// Reasons to use (not abuse) Recursion
// 1) Less Code
// 2) Elegant Code (aka Pleasing to Look at)
// 3) Increased Readability

// Reasons to NOT use Recursion
// 1) PErformance
// 2) Possibly more difficult to debug
// 3) Is the Readability Improved?

// The Standard Example: The Fibonacci Sequence
// 0, 1, 1, 2, 3, 5, 8, 13, 21, etc.
/* 
//Wtithout Recursion const fibonacci = (num, array = [0, 1]) => {
  while (num > 2) {
    const [nextToLast, last] = array.slice(-2);
    array.push(nextToLast + last);
    num -= 1;
  }
  return array;
};
 
// With Recusion:
 const fibonacci = (num, array = [0, 1]) => {
  if (num <= 2) return array;
  const [nextToLast, last] = array.slice(-2);
  num -= 1;
  return fibonacci(num, [...array, nextToLast + last]);
};

conssole.log(fibonacci(9));


// What numver is in the nth position of the fibonacci Sequence?

// Without Recursion ;

const fibonacciPos = (pos) => {
  const sequence = [0, 1];
  for (let i = 2; i <= pos; i++) {
    const [nextToLast, Last] = sequence.slice(-2);
    sequence.push(nextToLast + Last);
  }
  return sequence[pos];
};

console.log(fibonacciPos());
 

// With Recursion

const fibPos = (pos) => {
  if (pos < 2) return pos;
  return fibPos(pos - 1) + fibPos(pos - 2);
};

*/

const fibPos = (pos) => (pos < 2 ? pos : fibPos(pos - 1) + fibPos(pos - 2));

console.log(fibPos(8));

// Real-Life Examples:
// 1) Continuation Token from an API
const getAWSProductIdImages = async () => {
  //get the data with await fetch request
  if (data.isTruncated) {
    //recursive
    return await getAWSProductIdImages(
      productId,
      s3, //connection to s3
      resultArray, //accumulator
      data.NextContinuatonToken,
    );
  }
  return resultArray;
};

// 2) A Parser: a company directory, a file directory, the DOM - web crawler, An XML or JSON data export

const artistByGenre = {
  jazz: ["Miles Davis", "John Coltrane"],
  rock: {
    classic: ["Bob Seger", "The Eagles"],
    hair: ["Def Leppard", "Whitesnake", "Poison"],
    alt: {
      classic: ["Pearl Jan", "The Killers"],
      current: ["Jowave", "Sir Sly"],
    },
  },
  unclassified: {
    new: ["Caamp", "Neil Young"],
    classic: ["Seal", "Morcheeba", "Chris Stapleton"],
  },
};

const getArtistNames = (dataObj, arr = []) => {
  Object.keys(dataObj).forEach((key) => {
    if (Array.isArray(dataObj[key])) {
      return dataObj[key].forEach((artist) => arr.push(artist));
    }
    getArtistNames(dataObj[key], arr);
  });

  return arr;
};

console.log(getArtistNames(artistByGenre));
