# JavaScript Fundamentals

## Hello World

`script` tag is used in HTML to indicate internal/external script.

### External

- External script files can be attached to HTML using `src` attribute.
  `<script src="/path/to/script.js"></script>`
  Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"`, just like `src="./script.js"`, would mean a file `"script.js"` in the current folder.

- Exteranal scripts are downloaded and are stored in browser's cache. Other pages that reference those scripts will take it from the cache.
  A single `<script>` tag can’t have both the `src` attribute and code inside.

## Code Structure

## Statements

    Statements are syntax constructs and commands that perform actions.

## Semicolons

Sometimes browsers insert semicolon when it sees a new line. But this is not always true. It is thus recommended to insert `;` after every statement.

## Comments

As time goes on, programs become more and more complex. It becomes necessary to add comments which describe what the code does and why.

- One-line comments start with two forward slash characters `//`.
- Multiline comments start with a forward slash and an asterisk `/*` and end with an asterisk and a forward slash `*/`.

Nested comments are not supported.

## `Use strict`

ES5 modifies some of the existing features. To see those modifications working, one has to explicitly enable them with a special directive: `use strict`.

- Please make sure that `use strict` is at the top of your scripts, otherwise strict mode may not be enabled.
- There’s no way to cancel `use strict`

Modern JavaScript supports “classes” and “modules” – advanced language structures, that enable `use strict` automatically.

## Variables

A variable is a named place in the memory where a value is stored. `let message = 'Hello';` Variables names cannot be one of reserved words.

### Variable naming

There are two limitations on variable names in JavaScript:

- The name must contain only letters, digits, or the symbols $ and \_.
- The first character must not be a digit.
- When the name contains multiple words, camelCase is commonly used.

A variable assigned without declaration is allowed and automatically declares the variable in non-strict mode but causes error in strict mode.

```javascript
"use strict";
num = 5; //error: num is not defined
```

### Constants

- To declare constant variable, use `const` instead of `let`.
- Constant variables are named using capital letters and underscores.
- Capital-named constants are only used as aliases for “hard-coded” values.

### Variable naming rules.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you’re doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It’s only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a “user” then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

## Data types

A value in JS is always of a certain type. There are eight basic types in JS. A variable can have value of any type.

### Number

The number type represents both integer and floating point numbers.
Special Numeric Values exists:

- `Infinity` represents the mathematical Infinity ∞. It is a special value that’s greater than any number.
- `NaN` represents a computational error. It is a result of an incorrect or an undefined mathematical operation

### String

A string is surrounded by quotes.

- Double Quotes
- Single Quotes
- Backticks (allows to embed variables and expressions into a string by wrapping them in `${...}`. Those variables/expressions are evaluated before combining them with rest of the string)

### Boolean

Contains two values `true` or `false`.
`let nameFieldChecked = true;`

### `null` and `undefined` values

Represents noting, empty. Undefined, on the other hand represents a variable whose value is not assigned.

### Object

Store collections of data.

### typeof operator

Returns the type of argument. Can be written as `typeof x` or `typeof(x)`

- `typeof null` is `object`
- `typeof alert` is `function`

## Type Conversions

Operators and functions automatically convert values given to them to the right type.

- String(value) converts a value to a string
- Number(value) converts a value to a number
- Boolean(value) converts a value to a boolean

## Operators and Operands

**All operators in JS return a value (including `=` for Ex: `let c = 3 - (a=1+1)` here value of `a` resolved and returned to the outer expression)**
An operand is what operators are applied to. In `5 * 2` 5 & 2 are operands.
An operator is unary if it tied with a signle operand.

- `+` is used for concatenation of operators it atleast one of them is a string.

### Chaining Assignments

Chained assignments evaluate from right to left. Chained assignments evaluate from right to left. First, the rightmost expression 2 + 2 is evaluated and then assigned to the variables on the left: c, b and a. At the end, all the variables share a single value.

```javascript
let a, b, c;

a = b = c = 2 + 2;

alert(a); // 4
alert(b); // 4
alert(c); // 4
```

### Prefix and Postfix Operators

Also return a value like other operators but it depends on the where they are placed w.r.t to operands.

```javascript
let counter = 1;
let a = ++counter; // (*)
alert(a); // 2

let counter = 1;
let a = counter++; // (*) changed ++counter to counter++
alert(a); // 1
```

### Comma operator

It is an operator with lowest precedence. The comma operator allows us to evaluate several expressions, dividing them with a comma `,`.
Each of them is evaluated but only the result of the last one is returned. Understanding it's concept is very useful to modify an object's copy and keep the original object intact.

```javascript
let obj = {
  firstName: "John",
  lastName: "Smith",
};
let obj2 = {
  ...obj,
  firstName: "Mary",
};

console.log(obj.firstName, obj2.firstName); // John, Mary
```

Here all props of obj are spread out and firstName prop is overridden with another property assignment on the next line.

## Comparision

- Comparision operators are >,<,==,===,!=>. All comparison operators return a boolean value.
- Strings are compared letter-by-letter using lexicographical order (fancy word for Unicode). First character is compared (among them the character in the string which comes first in Unicode chart, is consider smaller than other), then second character and so on.
- Comparision convert values to numbers when values are of different types.

### Strict Equality vs `==`

Strict equality does not convert operands to numbers. Thus,

```javascript
0 === false; //false
0 == false; // true
```

[When you have time, check out how comparision results differ when operands are compared with null or undefined](https://javascript.info/comparison#comparison-with-null-and-undefined)
