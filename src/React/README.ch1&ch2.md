# This folder keeps track of learnings from the Oreilly Book called "Learning React"

## Ch-1 Welcome to React

- React was created by Facebook. It was then adopted by Netflix and Instagram.
- React Native, a library for building mobile applications using React was released.
- React Hooks were released which helps in adding and sharing stateful logic across components.
- Suspose is used to optimize asynchronous rendering with react.

## Ch-2 JS for React

- JS changes are shephearded by a committee called ECMA(European Computer Manufacturers Association).
- ECMAScript 1, 2 and 3 were released before 2000.
- ECMAScript 5 was released in 2009. ECMAScript 6 in 2015.

### const keyword

Is used to declare variable whose value cannot be changed.

```javascript
const key = "hello world";
```

### let keyword

A variable declared using let inside loop and conditional statements blocks off its scope by declaring that variable locally.

```js
var topic = "JavaScript";
if (topic) {
  var topic = "React";
  console.log(topic); //React
}
console.log(topic); //React
```

```js
var topic = "JavaScript";
if (topic) {
  let topic = "React";
  console.log(topic); //React
}
console.log(topic); //JavaScript
```

```javascript
var div,
  container = document.getElementById("container");

for (var i = 0; i < 5; i++) {
  div = document.createElement("div");
  div.onclick = function () {
    alert("This is box #" + i); //clicking any box will show "This is box #5" message (since i variable is declared here as global variable and is incremented to 5 before user clicks any box)
  };
  container.appendChild(div);
}
```

```javascript
const container = document.getElementById("container");
let div;
for (let i = 0; i < 5; i++) {
  div = document.createElement("div");
  div.onclick = function () {
    alert("This is box #: " + i); // It will show different messaged when clicked on different boxes because let variable is not declared as a global variable
  };
  container.appendChild(div);
}
```

### Template Strings

Is an alternative to string concatenation and allows varaibles to be inserted and evaluated in strings. Also called as template strings, template literals or string templates. Any JS that returns a value can be added to a template string between `${}`
Whitespace is recoginized as text.

```javascript
console.log(`${firstname}`);
```

### Function Declaration vs Function Expression

- Function Expressions are not hoisted but function declarations are.

### Default Function Parameters

```javascript
function logActivity(name = "Shane McConkey", activity = "skiing") {
  console.log(`${name} loves ${activity}`);
}
```

### Arrow functions

- Allows to create relatively smaller function declaration.

To return an object from the arrow function, simply wrap the object in parenthesis.

```javascript
const person = (firstName, lastName) => ({
  firstName,
  lastName,
});

console.log(person("John", "Smith"));
```

"this" keyword in the arrow-function refers to the object that defined the arrow function.

```javascript
const tahoe = {
  mountains: ["Freel", "Rose", "Tallac", "Rubicon", "Silver"],
  print: function (delay = 1000) {
    setTimeout(function () {
      console.log(this.mountains.join(", "));
    }, delay);
  },
};

tahoe.print(); // Uncaught TypeError: Cannot read property 'join' of undefined

const tahoe = {
  mountains: ["Freel", "Rose", "Tallac", "Rubicon", "Silver"],
  print: function (delay = 1000) {
    setTimeout(() => {
      console.log(this.mountains.join(", "));
    }, delay);
  },
};

tahoe.print(); // Freel, Rose, Tallac, Rubicon, Silver

const tahoe = {
  mountains: ["Freel", "Rose", "Tallac", "Rubicon", "Silver"],
  print: (delay = 1000) => {
    setTimeout(() => {
      console.log(this.mountains.join(", "));
    }, delay);
  },
};

tahoe.print(); // Uncaught TypeError: Cannot read property 'join' of undefined
```

### Compiling JS

Converts new JS feature into more widely compatible code before running it in the browser. Most popular framework is Babel.

- It is different thna compiling code to binary like how traditional languages are compiled.

- JS is automatically compiled by a build tool like webpack or parcel.

### Destructuring Objects

Is used to extract specific object values.

```javascript
const obj = {
  first_name: "John",
  last_name: "Smith",
};

let { first_name, last_name } = obj;

first_name = "Alex";
console.log(first_name, obj.first_name); // Alex, John

const lordify = ({ firstName }) => console.log(`${firstName} of India`);

lordify({
  firstName: "Alex",
});

const regularPerson = {
  firstname: "Bill",
  lastname: "Wilson",
  spouse: {
    firstname: "Phil",
    lastname: "Wilson",
  },
};

const lordify = ({ spouse: { firstname } }) => {
  console.log(`${firstname} of Canterbury`);
};

lordify(regularPerson); // Phil of Canterbury
```

### Destructuring Arrays

```javascript
const [firstAnimal, , thirdAnimal, fourthAnimal] = ["Cat", "Dog", "Lion"];
console.log(firstAnimal, thirdAnimal, fourthAnimal); // Cat, Lion, undefined
```

### Object Literal Enhancement

Is opposite of destructuring of objects. It’s the process of restructuring or putting the object back together. With object literal enhancement, we can grab variables from the global scope and add them to an object

```javascript
const animal = "Cow";
const animal_type = "Herbivores";
const print = function () {
  console.log(`Mt. ${this.name} is ${this.elevation} feet tall`);
};
console.log({ animal, animal_type, print });
```

A method (object-functions) can be (but does not need to be) declared with "function" keyword.

```javascript
var obj = {
  print() {
    console.log("hello world");
  },
  print2: function () {
    console.log("hello world");
  },
};
console.log(obj.print(), obj.print2()); //both are same.
```

### Three dots

- Use to combine arrays. Three dots (Spread operator) when used with an array does create a new copy of it.

```javascript
const peaks = ["Tallac", "Ralston", "Rose"];
const canyons = ["Ward", "Blackwood"];
const tahoe = [...peaks, ...canyons];
console.log(tahoe.join(", ")); // Tallac, Ralston, Rose, Ward, Blackwood
```

- The three dots (spread operator) can also be used to get the remaining items in the array:

```javascript
const lakes = ["Donner", "Marlette", "Fallen Leaf", "Cascade"];
const [first, ...others] = lakes;
console.log(others.join(", ")); // Marlette, Fallen Leaf, Cascade
```

- Three dots (rest operator) is used to collect function arguments as an array

```javascript
function directions(...args) {
  console.log(args); // ['Truckee', "Boston", "New York"]
}
directions("Truckee", "Boston", "New York");
```

### Asynchronous JS

Used to perform tasks which do not happen sequentially.

#### Fetch function

helps to do those kind of tasks

```javascript
console.log(fetch("https://api.randomuser.me/?nat=US&results=1"));
```

Fetch returns promise (specifically pending promise). It might resolve successfully or get rejected.

```javascript
fetch("https://api.randomuser.me/?nat=US&results=1")
  .then((res) => res.json())
  .then((json) => json.results)
  .then(console.log)
  .catch(console.error);
```

#### Async Await

Code looks like synchronous code. Function when declared with `async` keyword and if it has `await` in it then it won't execute any code after await until the promise is either resolved/rejected.

```javascript
const getFakePerson = async () => {
  try {
    let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
    let { results } = res.json();
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

getFakePerson();
```

### ES6 Modules

A JS module is a piece of reusable code that can easily be incorporated into other JS files without causing variable collisions. Any JS type can be exported using `export` or `export default` keywords. `export default` can only be used once in a file.

```javascript
// File: mt-freel.js;
export default new Expedition("Mt. Freel", 2, ["water", "snack"]);

// File: text-helpers.js;
export const print = (message) => log(message, new Date());
export const log = (message, timestamp) =>
  console.log(`${timestamp.toString()}: ${message}`);

// File abc.js
import { print, log } from "./text-helpers";
import freel from "./mt-freel";

print("printing a message");
log("logging a message");

freel.print();
```

### CommonJS

It is a module pattern supported by all versions of Node.
It exports module using `module.exports` and imported using `require`.
