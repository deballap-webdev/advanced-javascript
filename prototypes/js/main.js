/* // Prototypal Inheritance and the Prototype Chain.

// ES6 introduced classes which is the modern way to construct objects
// That said, prototypal inheritance and the prototype chain are:
// 1) "under the hood", (ES6 Classes are considered "syntactic sugar")
// 2) often in interview questions,
// 3) and are useful to understand

const person = {
  alive: true,
};

const musician = {
  plays: true,
};

//musician.__proto__ = person;
// Js now has getPrototypeOf and seetPrototyprOf methods instead of using __proto__
Object.setPrototypeOf(musician, person);
console.log(Object.getPrototypeOf(musician));
console.log(musician.__proto__);
console.log(Object.getPrototypeOf(musician) === musician.__proto__);
console.log(musician.plays);
console.log(musician.alive);
console.log(musician);
// missing property => go to person
console.log(musician.alive);
// Extending the prototype chain => general to specific to more specific
const guitarist = {
  strings: 6,
  __proto__: musician,
};

console.log(guitarist.alive);
console.log(guitarist.plays);
console.log(guitarist.strings);
console.log(guitarist);

// Things to remember about objects.
// No circular references allowed (person.__proto__ can't be guitarist or muscian.__proto can't be guitarist)
// the __proto__ value must be an object or null.
// An object can only directly inherit from another another object, we can't have it directly inherit from two or more objects.

// Object with getter and setter methods
const car = {
  doors: 2,
  seats: "vinyl",
  get seatMaterial() {
    return this.seats;
  },
  set seatMaterial(material) {
    this.seats = material;
  },
};

const luxuryCar = {};
Object.setPrototypeOf(luxuryCar, car);
luxuryCar.seatMaterial = "leather"; //Note keyword "this"
console.log(luxuryCar);
console.log(luxuryCar.doors);
console.log(car);

// Walking up the chain - props and methods are not copied
console.log(luxuryCar.valueOf());

// Getting the keys of an object
console.log(Object.keys(luxuryCar));
Object.keys(luxuryCar).forEach((key) => {
  console.log(key);
});

for (let key in luxuryCar) {
  console.log(key);
} */

// Object constructors

function Animal(species) {
  this.species = species;
  this.eats = true;
}

Animal.prototype.walks = function () {
  return `A ${this.species} is walking`;
};

const Bear = new Animal("bear");
console.log(Bear.species);
console.log(Bear.walks());
// The prototype property is where inheritable props and methods are
console.log(Bear.__proto__);
console.log(Bear.__proto__ === Animal.prototype);
console.log(Animal.prototype);
console.log(Bear);
