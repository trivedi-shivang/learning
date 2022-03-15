# Methods of primitives, Numbers, Strings, Array, Array Methods, Iterables

What happens here ?

```javascript
let str = "Hello";
console.log(str.toUpperCase()); // HELLO
```

The primitive `str` does not have any methods attached to it. Then, how a method is accessed on it and returns an output?
This happens as a result of "object-wrappers". These wrappers are different for each primitive type.

1. The string `str` is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like `toUpperCase()`.
2. That method runs and returns a new string (shown by `console.log`).
3. The special object is destroyed, leaving the primitive `str` alone.

These wrappers are created by JS engine internally and are not RECOMMENDED to be used in daily basis. These would cause unexpected errors.

```javascript
console.log(typeof 0); // 'number'
console.log(typeof new Number(0)); // 'object' since it created an object wrapper around the number
```

**`null`/`undefined` are not wrapped into objects by JS engine**

## Numbers

Numbers in JS are stored in 64-bit format. 52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers), and 1 bit is for the sign.

```javascript
let billion = 1000000000; //1
let billion = 1000_000_000; //2
let billion = 1e9; //3
//1, 2 & 3 are equivalent

// represents 0.000001
let mcs = 1e-6;

// to represent hex number, append the number with '0x'
let twoFiveFive = 0xff; //255 in hexadecimal

// similarly, for binary and octal numbers use 0b or 0o.
```

### `toString(base)`

Returns a string representation of `num`.

```javascript
let num = 255;
console.log(num.toString(16)); //ff
(255).toString(16); // same as above NOTE: number have to be wrapped in parenthesis in order to call a function on it.
console.log(num.toString(2)); //11111111
```

### Rounding

There are several methods to round numbers:

- `Math.floor` will round down
- `Math.ceil` will round up
- `Math.round` will round up with decimal part greater than 0.5 and round down if not.

There are several methods to round to nth-digit after the decimal

- Multiply and Divide

```javascript
let num = 1.23456;
let numRoundTo2Dec = Math.round(num * 100) / 100; //here 100 repesents number of 0's which you want `num` to round up to which is 2
```

- `toFixed(n)`
  Returns string representation of the rounded number. Use `+` or `Number(n)` to convert string to number.

### Imprecise Calculation

The result of `1/3` is endless fraction but `1/10` is not because decimal numbers when divided by 10 easily precise solution. Similarly, binary numbers are better represented when they are divided by 2. Any other division causes endless binary fraction. This happens the following comparison results in false.
`0.1 + 0.2 == 0.3`
A better way to do such calculation is to use methods like `toFixed(n)` to round up numbers like
`+(0.1+0.2).toFixed(2) == 0.3`

### `isFinite` and `isNaN`

`isNaN(value)` converts its argument to a number and then tests it for being `NaN`
`isFinite(value)` converts its argument to a number and returns `true` if it’s a regular number, not `NaN/Infinity/-Infinity`:

### `Object.is`

works similarly to `===`. Except for two edge cases.

```javascript
console.log(0 === -0); //true
console.log(Object.is(0, -0)); //false
console.log(NaN === NaN); //false
console.log(Object.is(NaN, NaN)); //true
```

### `parseInt` and `parseFloat`

`+` or `Number()` will return `NaN` if a string contains anyhting other than a number.
In that scenarios, `parseInt` or `parseFloat` will work. Those methods will scan the string to find all numbers until it can't and return founded numbers
But, if the string contains a non-numerical character at the begining of the string than methods will stop parsing further and will return `NaN`

```javascript
alert(parseInt("100px")); // 100
alert(parseInt("a123")); // NaN, the first symbol stops the process
alert(parseInt("0xff", 16)); // 255 // second parameter specifies the base of the numeral system to which the give number should be converted from to an integer
alert(parseInt("2n9c", 36)); // 123456
```

### Other methods

- `Math.random()` will give a number between 0 and 1 (including 0 but not 1)
- `Math.max`/`Math.min` returns max/min amongst all numbers.
- `Math.pow(2,10)` raises 2^10 = 1024

## Strings

- Strings are stored internally as UTF-16 format.
- Backticks easily allow us to create multi-line strings. They can also be created using `\n` in single/double quotes.
- One can print special character by having `\`(escape character) in front of them. For Ex: `\t` for tab, `\b` for backspace and so on.
- length of a string can be found by `str.length`
- Individual characters of a string can be accessed using [pos] or `str.charAt(pos)`. Each character can be iterated using `for...of`.

```javascript
let str = `Hello`;
console.log(str[0]); // H
console.log(str.charAt(0)); // H
for (let char of str) {
  console.log(char);
}
```

### String Methods

- Strings are immutable. It is impossible to change a character in it. The usual workaround is to create a whole new string and assign it to `str` instead of the old one.
- String case can be changed using `toUpperCase()` or `toLowerCase()`
- There are multiple ways to search for a substring in a string.
  - `str.indexOf(substr, pos)` looks for the substr in str, starting from the given position pos, and returns the position where the match was found or -1 if nothing can be found. Similarly `str.lastIndexOf(substr,pos)` returns index of substr from the end.
  - `str.includes(substr, pos)` returns `true/false` if substring, from the given position `pos`, is found or not.
  - `str.startsWith(substr)` returns `true/false` if string starts with substring. Similarly, `str.endsWith(substr)` works but checks end of the string.
- There are many methods to get a substring from a string.
  - `str.slice(start, end)` Returns the part of the string from start to (but not including) end.
  - `str.substr(start, length)` Returns the part of the string from `start`, with the given `length`.

### String Comparision.

Each character in strings are compared using their UTF-16 numeric code. There are special methods that allow to get the character for the code and back.

- `str.codePointAt(pos)` Returns the code for the character at position `pos`
- `String.fromCodePoint(code)` Creates a character by its numeric `code`

For many alphabets, it’s better to use `str.localeCompare` method to correctly sort letters, such as `Ö`. The call `str.localeCompare(str2)` returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

## Arrays

- Array allow to store ordered collection values of any types (string, number, object....)
- Arrays are special kind of objects whose keys are indexes and has a special property called `length`. `length` stores the greatest numeric index plus one.
- Arrays are stored by reference.

```javascript
console.log(typeof {}, typeof []); // 'object', 'object'
console.log(Array.isArray({}), Array.isArray([])); // false, true
```

- Array which allows to add/remove both to/from the beginning or the end is called deque
- Array is created using any of the following syntaxes:

```javascript
let arr = new Array(); //rarely used
let arr = [];
```

- Arrays, unlike strings, are mutable.
- Array has a property `length` to show number of elements in it.

### Array methods

- `push` appends an element to the end.
- `pop` takes an element from the end. `push/pop` methods are faster than `shift/unshift`.
- `shift` get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.
- `unshift` adds the element to the beginning of the array.
- `splice` method is best to work with arrays. It modified `arr` starting from the index `start` removes `deleteCount` elements and then inserts `elem1,..., elemN` at their place. Returns the array of removed elements.
- `slice` returns a new array copying to it all items from index `start` to `end` (not including `end`).
- `arr.indexOf`, `arr.lastIndexOf` and `arr.includes` works on arrays similar to strings. The difference is it works on array elements instead of string characters.
- `arr.find` It executes a function on each element of the array. If the function returns true, the search is stopped and `item` is returned. If nothing found, `undefined` is returned. `arr.findIndex` it returns the inex where the element was found instead of the element itself.

```javascript
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];
let user = users.find((item) => item.id == 1);
alert(user.name); // John
```

- `arr.filter` returns elements which return `true` from the function.
- `arr.map` method calls the function for each element on the array and returns transformed array elements.
- `arr.sort` sorts the array in place. Items are sorted as strings by default. It accepts a function as an argument which would be used by JS engine to sort elements.
- `arr.reverse` reverses the order of elements in `arr`.

- `arr.concat(arg1, arg2.... argN)` returns a combination of all elements of arr first and then copies arrays or values `args` into the new array.

```javascript
let arr = [1, 2];
console.log(arr.concat(3, 4, 5, 6)); // [1,2,3,4,5,6]
```

Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:

```javascript
let arr = [1, 2];
let arrayLike = {
  0: "something",
  length: 1,
};
console.log(arr.concat(arrayLike)); // 1,2,[object Object]
```

But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s treated as an array by concat: its elements are added instead:

```javascript
let arr = [1, 2];
let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2,
};
console.log(arr.concat(arrayLike)); // 1,2,something,else
```

- `forEach` allows to run a function for every element on the array

```javascript
arr.forEach(function (item, index, array) {});
```

**If you want arbitrary keys to be assigned, use object instead of arrays since arrays optimizations will be turned off if you assign arbitrary keys to the array**

### Multidimensional arrays

Arrays can have items that are also arrays. We can use it for multidimensional arrays.

### `toString`

Arrays have their own implementation of toString method that returns a comma-separated list of elements.

```javascript
let arr = [1, 2, 3];
console.log(arr); // 1,2,3
console.log(String(arr) === "1,2,3"); // true
```

### Iterators

Iterable objects are generalizable of arrays. That makes any object useable in a `for-of` loop. `Symbol.iterator` is a method which can be addded to the object to make it iterable.

```javascript
let range = {
  from: 5,
  to: 1,
};

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current >= this.last) {
        return { done: false, value: this.current-- };
      } else {
        return { done: true };
      }
    },
  };
};

for (let num of range) {
  console.log(num);
}

// this can be written as
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },
  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};
for (let num of range) {
  console.log(num);
}

// Similarly, it can be applied on strings as well
let str = "test";
let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value);
}
```

### Iterable & array-likes

- Iterables are objects that implement the Symbol.iterator method, as described above.
- Array-likes are objects that have indexes and length, so they look like arrays.

### Make Array-likes/iterables to works as an array

This can be done using `Array.from`. It takes an iterable/array-like and makes a real 'array' from it.

```javascript
let arrayLike = {
  0: "hello",
  1: "world",
  length: 2,
};
let arr = Array.from(arrayLike);
for (let string of arr) {
  console.log(string);
}
```

### Map and Set

Map is a collection of keyed data items, just like an object
Methods and Props:

- `new Map()` – creates the map.
- `map.set(key, value)` – stores the value by the key.
- `map.get(key)` – returns the value by the key, `undefined` if `key` doesn’t exist in map.
- `map.has(key)` – returns `true` if the key exists, `false` otherwise.
- `map.delete(key)` – removes the value by the key.
- `map.clear()` – removes everything from the map.
- `map.size` – returns the current element count.

For looping over a map, there are 3 methods:

- `map.keys()` – returns an iterable for keys,
- `map.values()` – returns an iterable for values,
- `map.entries()` – returns an iterable for entries `[key, value]`, it’s used by default in `for..of`.
