# Objects, Object References and Copying, Garbage Collection, Object methods, `this`, Constructor, `new`, Optional Chaining, Symbol Type, Object to Primitive Conversion

- Objects are used to store keyed collections of complex entities.
- An object consists of properties with each property is a "key:value' pair, where key is a string/symbol (can be any reserved word) and value can be anything.
- An object is created using one of two syntaxes.
- To remove a property, `delete` operator is used.
- Multiword property names have to be quoted.
- The dot notation requires the key to be a valid variable identifier (cannot contain spaces, doesn't start with a digit and doesn't include special characters).

```javascript
let user = new Object(); // "object constructor" syntax
let user = {}; // "object literal" syntax

let user = {
  // an object
  name: "John", // by key "name" store value "John"
  age: 30, // by key "age" store value 30
  "likes birds": true,
};
```

## Object properties

- Multi word properties cannot be accessed/set by dot notation. They have to be accessed/set using square brackets.
- Square brackets allow variable (inside the brackets) to be computed while dot-notation cannot. They are called "computed properties"

```javascript
user.likes birds = true; //syntax error
user['likes birds'] = true; // will work fine

// or
let key = 'likes birds';
user['likes birds'] = true;
user[key] = true; //here 'key' variable is evaluated to a value 'likes birds' which becomes multi-word property for the object.
```

## Property value shorthand

If the property is same as the varaible name then one can use shorthand as follows:

```javascript
function makeUser(name, age) {
  return {
    name, // same as name: name
    age, // same as age: age
    // ...
  };
}
```

## Property Names

- Property Names are either string or symbol. If one not provided then those types are converted to string.
  `let obj = {0: 'test'} // same as let obj = {'0': 'test'}`

- It’s possible to access any property. There will be no error if the property doesn’t exist! Reading a non-existing property just returns `undefined`.

```javascript
let user = {};
alert(user.noSuchProperty === undefined); // true means "no such property"
```

- Left side of `in` is usually a quoted string. If not then that variable is computed.

```javascript
let user = { age: 30 };
let key = "age";
alert("age" in user); // true, property "age" exists
alert(key in user); // true, property "age" exists
```

- `in` is useful when property is assigned value `undefined`. In that case, the following will return true which is incorrect
  `let obj = {test: undefined}; console.log(obj.test === undefined);`

- All properties of an object can be looped over using `for...in`.

```javascript
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // keys
  alert(key); // name, age, isAdmin
  // values for the keys
  alert(user[key]); // John, 30, true
}
```

## Property Names ordering

Integer property names are those properties which can be converted to integers using parseInt. '+49' or '1.2' are not property names.
If they do exist, they are shown using `for...in` in numerical order while non-property names (if they exist) are show in the order of creation.

```javascript
let obj = {
  1: true,
  1.2: "b",
  2: false,
  a: true,
};

for (let key in obj) {
  console.log(key, obj[key]);
}
// 1 true
// 2 false
// 1.2 b
// a true
```

## Object is stored by reference.

A non-object value is stored as is while an object value is stored by reference.
`let user = {name: 'John'};`
The object is stored somewhere in memory (imagine a cabinet with 'name' as a file which contains a paper on which 'John' is written on it), while the user variable has a “reference” (has key of the cabinet) to it.
When the same obj is copied over to another variable, same reference is used (duplicate key for the cabinet is created). Thus, any changes to the property are reflected for all objects which share reference.

```javascript
let user = {
  name: "John",
};
let user2 = user;
user2.name = "Mary";
console.log(user.name, user2.name); //Mary, Mary
```

## Cloning and Merging

Objects can be copied by cloning. If the property values are primitive, objects can be cloned using any of the following methods:

- Using `for(;;)`
- Using spread operator `{...obj}`
- Using `Object.assign`

Those methods also work with objects having nested properties. But, the properties have to have primitive values.

If an object have a property non-primitive value, then using any of the above methods copies that property by reference. Thus, objects like those have to be deep-cloned (by checking at property level if it's value is primitive or not and then cloning the property value if it's value is non-primitive). This can be done using `_cloneDeep` method from `lodash` library.

## Garbage Collection

It's a JS mechanism which removes those objects which become unreachable.
"reachable" values are those that are accessible or usable somehow.

1. There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons. These values are called roots.
   For instance:

   - The currently executing function, its local variables and parameters.
   - Other functions on the current chain of nested calls, their local variables and parameters.
   - Global variables.
   - (there are some other, internal ones as well)

2. Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

```javascript
let user = { name: "John" }; //1
let user2 = user;
user = null; //object at '1' is still accessible by user2. hence that object won't be garbaged.
user2 = null; //now the object can be garbaged.
```

[When you have time, check out how internal algorithms perform garbage collection](https://javascript.info/garbage-collection#internal-algorithms)

## Object methods.

Functions as properties of an object are called methods.

```javascript
function sayHi() {
  console.log("hii");
}
let user = {
  name: "John",
  // sayHi: sayHi
  sayHi: function () {
    console.log("hii");
  }, //both sayHi props are equivalent
};
```

## `this`

The value of `this` is the object "before dot", the one used to call the method.

```javascript
let user = {
  name: "John",
  sayHi() {
    console.log(user.name); //John. This is not dynamic have to change object name ('user') every time for different object.
    console.log(this.name); //John
  },
};
```

### this is not bound

- It is evaluated at runtime. It's value is 'undefined' in strict mode and global-object in non-strict mode.
- Arrow function reference `this` from outer "normal" (non-arrow) function

## Constructor function

A function from which multiple objects are created by calling the function with `new` are called construtor functions. Such function-name usually start with capital letter.

```javascript
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this.sayHi = function () {
    console.log(`${this.name} says hi`);
  };
}
let user = new User("Jack");
```

Any such function implicitly creates empty object and is assigned to `this`. any assingments in the function are tied with `this` and `this` is implicitly returned from the function.

Normally nothing is returned from constructor functions.

## Optional Chaining.

As an example, let’s say we have user objects that hold the information about our users.
Most of our users have addresses in user.address property, with the street user.address.street, but some did not provide them.
In such case, when we attempt to get user.address.street, and the user happens to be without an address, we get an error:

This error can be avoided using one of the following three methods:

1. Using `?:` condition
   `let street = user.address ? user.address.street ? user.address.street : null : null`
2. Using `&&`
   `let street = user && user.address && user.address.street`
3. Using `?:` (most elegant - stop the evaluation if the value before `?.` is `undefined`)
   `let street = user?.address?.street`

Any of the above conditions evaluate to `undefined`/`null` value instead of erroring out. Please note: the ?. syntax makes optional the value before it, but not any further. The variable before `?.` has to be declared otherwise `ReferenceError` might be thrown.

`?.` immediately stops the evaluation if the left part doesn't exist.

```javascript
let user = null;
let x = 0;
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++
alert(x); // 0, value not incremented
```

Similar to `?.`, there are other constructs which work with functions `?()` and square brackets `?[]`. `?.` can also be used with `delete`.

`?.` cannot be used on left side of an assigment. Because that might be `undefined = 'John` which does not make sense.

## Symbol

A symbol represents a unique identifier. A value of this type can be created using `Symbol()`

```javascript
// id is a symbol with the description "id"
let id1 = Symbol("id");
let id2 = Symbol("id");
let id3 = Symbol();
console.log(id1 == id2); //false Symbols are always unique values
// Symbols are not implicitly converted to strings. They can be converted either via
console.log(id1.toString()); //Symbol(id)
console.log(id1.description); //id //gives description of symbol (if exist)
console.log(id3.description); // undefined
```

A Symbol would always be unique even if same name key is declared in third-party library

```javascript
let user = {
  name: "John",
};
let id = Symbol("id");
user[id] = "something_here";
// or
let user = {
  name: "John",
  id: Symbol("id"),
};
```

Symbols are skipped in `for...in` and `Object.keys`. BUT, they are copied using `Object.assign`.

There exist a 'global symbol registry'. `Symbol.for(key)` checks the global registry, and if there’s a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key) `and stores it in the registry by the given `key`. Similarly, `Symbol.keyFor(Symbol(key))` returns name by a global-symbol.

```javascript
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");
// get name by symbol
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

Both `Symbol.for` and `Symbol.keyFor` uses global-registry. `Symbol.keyFor` will return `undefined` for non-global symbols.

## Object to primitive conversion

What happens when two objects are added or subtracted?

**REMEMBER: Objects are `true` in a boolean context. True for `{}`**

There are three variants of type conversions on object.

1. Call `obj[Symbol.toPrimitive](hint)` – the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"` try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or "default" try `obj.valueOf()` and `obj.toString()`, whatever exists.

[Need to revisit](https://javascript.info/object-toprimitive)
