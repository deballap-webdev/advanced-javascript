"use strict";
// What is the value of this ("The Million Dollar Question")
// Outside a function is (doesn't matter if its in an if statement or a loop) the global window object.
if (true) {
  console.log(this);
}
console.log(this);
// So that is who ever is on the left side of the function invocation (as in what is before the dot)
// example
function talk() {
  return this;
}

const me = {
  name: "Debbie",
  talk,
  talking,
};

const Luke = {
  name: "Luke",
  talk,
  talking,
};

console.log(me.talk());
console.log(talk()); // this will give undefined cause it's strict mode, but on a normall talk() will return the window object.
function talking() {
  console.log(`I am ${this.name}`);
}
// This is contextual and dynamic and the value changes
Luke.talking();
me.talking();

// What if we have an object where we can't put our talk method inside it, say the object is immutable or for any reason.
// the bind method
// All JavaScript Functions has the bind method in it's prototype
const Josh = {
  name: "Josh",
};

console.log(talking.bind(Josh));
const joshTalk = talking.bind(Josh); // returns a function with Josh as this
joshTalk();
talking.call(Josh); // doesn't return just executes function talking with Josh as this

function langTalk(lang) {
  return lang === "esp"
    ? `Soy ${this.name}`
    : lang === "it"
      ? `Sono ${this.name}`
      : lang === "en"
        ? `I am ${this.name}`
        : `Please Enter "esp", "en" or "it" as language parameter`;
}

console.log(langTalk.call(Josh, "it"));
console.log(langTalk.call(Josh, "en"));
console.log(langTalk.call(Josh, "esp"));
// So the langTalk or talking don't have to be part of the methods of the object we could just bind or call it. apply is simmilar to call so instead of passing the arguments one by one like rest parameters in the method (for call) we put them in an array (for apply).
/* 
function Person(n) {
  this.name = n;
  console.log(this);
  
}*/
const gary = new Person("Gary");
const gordon = new Person("Gordon");
const lisa = new Person("Lisa");
// The gotchas with callback functions
/* function Person(n) {
  this.name = n;
  //console.log(this);
  setTimeout(function () {
    console.log(this);
  }, 100);
} */

//There are 2 ways to fix this.
// 1) Binding

/* function Person(n) {
  this.name = n;
  setTimeout(
    function () {
      console.log(this);
    }.bind(this),
    100,
  );
} */

// 2) With arrow functions
function Person(n) {
  this.name = n;
  setTimeout(() => {
    console.log(this);
  }, 100);
}
