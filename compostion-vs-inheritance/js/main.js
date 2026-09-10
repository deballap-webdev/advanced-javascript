"use strict";
class Pizza {
  constructor(size, crust, sauce) {
    this.size = size;
    this.crust = crust;
    this.sauce = sauce;
    this.toppings = [];
  }
  prepare() {
    console.log("Preparing...");
  }
  bake() {
    console.log("Baking");
  }
  ready() {
    console.log("Ready!");
  }
}

// Problem : Repeating methods - not D.R.Y.

class Salad {
  constructor(size, dressing) {
    this.size = size;
    this.dressing = dressing;
  }

  prepare() {
    console.log("Preparing...");
  }
  toss() {
    console.log("Tossing...");
  }
  ready() {
    console.log("Ready!");
  }
}

class stuffedCrustPizza extends Pizza {
  stuff() {
    console.log("Stuffing the crust...");
  }
}

class butteredCrustPizza extends Pizza {
  butter() {
    console.log("Buttering the crust...");
  }
}

// Problem: Repeating methods - Not D.R.Y.
class stuffedButteredCrustPizza extends Pizza {
  butter() {
    console.log("Buttering the crust...");
  }
  stuff() {
    console.log("Stuffing the crust...");
  }
}

const myPizza = new stuffedButteredCrustPizza();
myPizza.stuff();
myPizza.butter();

// Instead use composition for methods
const prepare = () => {
  return {
    prepare: () => console.log("Preparing..."),
  };
};

const toss = () => {
  return {
    toss: () => console.log("Tossing..."),
  };
};

const bake = () => {
  return {
    bake: () => console.log("Baking..."),
  };
};
const ready = () => {
  return {
    ready: () => console.log("Ready!"),
  };
};
const butter = () => {
  return {
    butter: () => console.log("Buttering the crust..."),
  };
};

const stuff = () => {
  return {
    stuff: () => console.log("Stuffing the crust..."),
  };
};

const createPizza = (size, crust, sauce) => {
  const pizza = {
    size,
    crust,
    sauce,
    toppings: [],
  };
  return {
    ...pizza,
    ...prepare(),
    ...bake(),
    ...ready(),
  };
};

const createSalad = (size, dressing) => {
  return {
    size,
    dressing,
    ...toss(),
    ...prepare(),
    ...ready(),
  };
};
// Compare to Es6 Class syntax with extends and super()

const createStuffedButteredCrustPizza = (pizza) => {
  return {
    ...pizza,
    ...stuff(),
    ...butter(),
  };
};
const anotherPizza = createPizza("medium", "thick", "chicken");
const sombodysPizza = createStuffedButteredCrustPizza(anotherPizza);
// OR
const debbiesPizza = createStuffedButteredCrustPizza(
  createPizza("medium", "thick", "chicken"),
);
const debbiesSalad = createSalad("side", "ranch");

debbiesPizza.bake();
debbiesPizza.butter();
debbiesPizza.prepare();
debbiesPizza.stuff();
console.log(debbiesPizza);
debbiesSalad.toss();
console.log(debbiesSalad);

// What about the toppings?
const addTopping = (pizza, topping) => {
  pizza.toppings.push(topping);
  return pizza;
};

const jimsPizza = createPizza("meduim", "thin", "original");
console.log(jimsPizza);
console.log(addTopping(jimsPizza, "pepperoni"));
console.log(jimsPizza); //mutation!

// We need to clone the pizza object to avoid mutation
// Function composition!
/* const shallowPizzaClone = (fn) => {
  return (obj, array) => {
    const newObj = { ...obj };
    return fn(newObj, array);
  };
}; */
const shallowPizzaClone = (fn) => (obj, array) => fn({ ...obj }, array);

let addToppings = (pizza, toppings) => {
  pizza.toppings = [...pizza.toppings, ...toppings];
  return pizza;
};

// decorate the addToppings funcyion with shallowClone
addToppings = shallowPizzaClone(addToppings);

const debbiesPizzaWithTopppings = addToppings(debbiesPizza, [
  "olives",
  "cheese",
  "pepperoni",
]);
/* const newPizza = shallowPizzaClone(addToppings)(debbiesPizza, [
  "lake",
  "great",
]); */
console.log(debbiesPizzaWithTopppings);
console.log(debbiesPizza);
console.log(debbiesPizza === debbiesPizzaWithTopppings);
