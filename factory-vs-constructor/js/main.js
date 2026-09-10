"use strict";
function personFactory(name) {
  return {
    name,
    talk() {
      return `I am ${this.name}`;
    },
  };
}

const me = personFactory("Debbie");
const you = personFactory("Joshua");
console.log(you.talk());
console.log(me.talk());
console.log(me);

// notice  how changing the talk function for 'me' object doesn't change it for 'you' object
// Why does it matter?
// 1) it tells us that you.talk and me.talk are not the same function in memory, so each object gets its own copy of the function.
// 2) We are occupying more space in memory
// 3) If we need to modify our logic, we would have to change it on all of the objects we created. We aren't using an inheritance heirarchy.
me.talk = function () {
  return `Hello, I am ${this.name}`;
};
console.log(me.talk());
console.log(you.talk());

// Work arounds for this
// 1) This is a terrible idea all your javascript objects will have a speak method
console.log(Object.prototype === me.__proto__);
Object.prototype.speak = function () {
  return "Hi!";
};
console.log(me);
console.log(me.speak());
console.log(you.speak());
const a = {};
console.log(a.speak());
console.log(window.speak());

// The Better Fix
const myProto = {
  talk() {
    return `Hello, I am ${this.name}`;
  },
};

function createSomeone(name) {
  return Object.create(myProto, {
    name: {
      value: name,
    },
  });
}

const Debbie = createSomeone("Debbie");
console.log(Debbie.talk());
console.log(me);

function Person(name) {
  this.name = name;
}

const Gabriel = new Person("Gabriel");
console.log(Gabriel);
Person.prototype.talk = function () {
  return `Hello I am ${this.name}`;
};
console.log(Gabriel.talk());
const Lucy = new Person("Lucy");
console.log(Lucy.talk());
Person.prototype.talk = function () {
  return `Hola, soy ${this.name}`;
};
console.log(Lucy.talk());
console.log(Gabriel.talk());

// Factories are simple and a little bit more flexible, we use the power of closurre to acheive data privacy, Something we can't naturally do with classes and inheritance cause it's exposed on the prototype chain we could accidentally create a bug by manipulating or changing data.

function privatePerson(name) {
  return {
    talk: () => `I am ${name}`,
  };
}

const Dave = privatePerson("Dave");
console.log(Dave.talk());
console.log(Dave.name); // Undefined
// N.B ES6 classes are just syntactic sugar for constructors
