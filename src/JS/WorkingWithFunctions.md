# Recursion and stack, Rest parameters and spread syntax

A recursive function is a function which is broken into a simpler action and a simpler call of the same task.

```javascript
function pow(x, n) {
  if (n === 1) return x;
  return x * pow(x, n - 1); // here simpler action is '*' and simpler call is pow(x, n-1)
}
```

The information about the process of execution of a running function is stored in its execution context. It is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this and few other internal details. Here is the execution context takes `n` memory space.

One function call has exactly one execution context associated with it. When a function makes a nested call, the following happens:

1. The current function is paused.
2. The execution context associated with it is remembered in a special data structure called execution context stack.
3. The nested call executes.
4. After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.

### Rest parameters

Are used to gather arguments into an array(if used with a function parameter). Rest parameter has to be at the end of the arguments list.

```javascript
function sumAll(...nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  return sum;
}
sumAll(1); //1
sumAll(1, 2, 3, 4, 5); //15
```

### `arguments`

It is a special array like object that contains all arguments by their index.

```javascript
function showName() {
  console.log(arguments.length); // 2
  console.log(arguments[0]); // 'A'
}
showName("A", "B");
```

Similar to `this`, `arguments` inside arrow-function derives its values from outer 'normal' function

### Spread parameter

It 'expands' an iterable object into the list of arguments.

```javascript
let arr = [1, 2, 3, 4];
Math.max(...arr); // 4
Math.max(...arr, ...arr.map((x) => x * 2)); //8
```
