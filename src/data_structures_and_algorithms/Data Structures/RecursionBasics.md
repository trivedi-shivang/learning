In Recursion make input smaller. but why?
In Recursion we do something due to which our input automatically becomes smaller

When we need to implement recursion? When for a given problem if we are given choices and decisions, recursions would be a good way to solve the problem.

Once you create a recursion-tree, implementing recursion problem will be a cakewalk.

Let's consider the following subset problem:
Given a string "abc", find all subsets of it (Its subsets will be "", "a", "b", "c", "ab", "bc", "ac", "abc")
Here we have choices to decide whether to take each character of the string or not.

Recursive Tree can be made using IP-OP method.
We assume O/P (Output) to be empty string in this case. The folloing is Recursive tree. The tree has nodes and branches. Each node consist of O/P and I/P. Each branch is a choice. The first set of branches indicated choices we had to either include or not include "a". On left hand side we did not include "a" but on right hand side we did include. We are getting answers in leaf-nodes (here when I/P becomes empty).

                                    "" "ab"
                                    / \
                                /       \
                            /               \
                            "" "b"          "a" "b"
                        /\                    /  \
                    /       \                /      \
                /           \             "a" ""    "ab" ""
                "" ""       "" "b"

There are different methods, other than recursive tree, to handle recursive problem. We can use recursive-tree when we know which decisions to take.
There is another method called Hypothesis-Induction-Base (IBH)

Let's consider the following problem: Given N, print 1 to N using recursion
we can hypotheis that print(n) will print 1 to N. Similarly print(n-1) will print 1 to n-1.

base condition is smallest valid input. Here, it is n=1 since the smallest number we have to print is 1.

Induction step is the difference between hypothesis we designed and the actual problem is. the actual problem is print(n), the hypothesis is print(n-1), the induction will be to print n after calling print(n-1).

In subset problem, using recursive-tree, we knew that when input becomes zero, we will get output. In print(n) we don't need to make hard decisions. Hence print(N) can be solved without recursive-tree.

```javascript
function print(n) {
  if (n === 1) console.log(1); //base
  else {
    print(n - 1); //hypothesis
    console.log(n); //induction
  }
}

print(7);
```

Let's see how IBH works.

Given n, lets print n to 1.
We hypotheis that if print(n) prints n to 1 then print(n-1) will print n-1 to 1.
smallest valid input is 1.

```javascript
function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1);
}

factorial(7);
```

Sort an array using recursion

```javascript
function sort(arr) {
  if (arr.length === 1 || arr.length === 0) return;
  else {
    let lastEl = arr.pop();
    sort(arr);
    insert(arr, lastEl);
  }
}

function insert(arr, temp) {
  if (arr.length === 0 || arr[arr.length - 1] <= temp) {
    arr.push(temp);
  } else {
    let lastEl = arr.pop();
    insert(arr, temp);
    arr.push(lastEl);
  }
}
let arr = [2, 3, 7, 6, 4, 5, 9];
sort(arr);
console.log(arr);
```

Sort a stack

```javascript
function sortStack(arr) {
  if (arr.length === 0 || arr.length === 1)
    return; //empty stack or stack with an element is already sorted.
  else {
    let val = arr.pop();
    sortStack(arr);
    insert(arr, val);
  }
}

function insert(arr, temp) {
  if (arr.length === 0 || arr[arr.length - 1] <= temp) {
    arr.push(temp);
  } else {
    let val = arr.pop();
    insert(arr, temp);
    arr.push(val);
  }
}
let arr = [5, 4, 3, 2, 1];
sortStack(arr);
```

Given a stack, print its elements after delete middle element from it

```javascript
function printStack(arr, kIdx) {
  if (arr.length === 0) return;
  if (kIdx === 1) {
    arr.pop();
    return;
  } else {
    let lastEl = arr.pop();
    printStack(arr, kIdx - 1);
    arr.push(lastEl);
  }
}
let arr = [5, 4, 3, 2, 1];
printStack(arr, Math.floor(arr.length / 2 + 1));
```

Given a stack, reverse it

```javascript
function reverseStack(arr) {
  if (arr.length === 0 || arr.length === 1) return;
  let lastEl = arr.pop();
  reverseStack(arr);
  popAndInsert(arr, lastEl);
}

function popAndInsert(arr, lastEl) {
  if (arr.length === 0) {
    arr.push(lastEl);
    return;
  }
  let temp = arr.pop();
  popAndInsert(arr, lastEl);
  arr.push(temp);
}

let arr = [5, 4, 3, 2, 1];
reverseStack(arr);
console.log(arr);
```

https://leetcode.com/problems/k-th-symbol-in-grammar/

```javascript
function kGrammer(n, k) {
  if (n === 1 && k === 1) return 0;
  let mid = Math.pow(2, n - 1) / 2;
  if (k < mid) {
    return kGrammer(n - 1, k);
  } else {
    return 1 - kGrammer(n - 1, k - mid);
  }
}
kGrammer(2, 2);
```
