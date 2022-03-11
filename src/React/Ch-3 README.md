# Ch-3 Functional Programming with JavaScript

Functions can sent from /return to functions, be stored as array elements, added to objects.
Functions that either take or return other functions are called higher order functions.

```javascript
const insideFn = (logger) => {
  logger("They can be sent to other functions as arguments");
};
insideFn((message) => console.log(message));
```

## Imperative Vs Declarative programming.

- Imperative programming is concerned with how to achieve results with code. It requires many comments to indicate what the code is doing. Following is an example of imperative programming.

```javascript
const string = "Restaurants in Hanalei";
const urlFriendly = "";
for (var i = 0; i < string.length; i++) {
  if (string[i] === " ") {
    urlFriendly += "-";
  } else {
    urlFriendly += string[i];
  }
}
console.log(urlFriendly); // "Restaurants-in-Hanalei"
```

- Declarative programming on the other hand prioritizes what should happen.

```javascript
const urlFriendly = string.replace(/ /g, "-");
```

## Functional (Declarative) Concepts

### Immutability

A function which does not change input but does copy input, make changes on it and returns the copied changed input.

```javascript
// instead of
const rateColor = (color, rating) => {
  color.rating = rating;
  return color;
};

// this
const rateColor = (color, rating) => ({
  ...color,
  rating,
});

// or this
const rateColor = (color, rating) => {
  return Object.assign({}, color, { rating });
};
```

## Pure Function

A function which atleast takes an argument, return a value or a function and does not cause side-affect change global-variables or affect application state.

```javascript
const fredrick = {
  name: "Fredrick Douglass",
  canRead: false,
  canWrite: false,
};

const selfEducate = (person) => {
  person.canRead = true;
  return person;
};

console.log(selfEducate(fredrick));
console.log(fredrick);
```

Here the function does take an argument returns a value but changes global variable.
The following function is a pure function and is easily testable.

```javascript
const selfEducate = (person) => ({
  ...person,
  canRead: true,
});
```

**Try to follow three steps when creating function**

- The function should take in at least one argument.
- The function should return a value or another function.
- The function should not change or mutate any of its arguments.
