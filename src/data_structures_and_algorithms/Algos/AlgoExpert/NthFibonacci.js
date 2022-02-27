// O(2^n) Time | O(n) Space (Callstacks)
function nthFibonacci(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;
  else return nthFibonacci(n - 1) + nthFibonacci(n - 2);
}
nthFibonacci(5);

// recursive solution with memoization
// O(n) Time | O(n) space
let computedAns = {};
function nthFibonacci(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;
  if (!(n in computedAns)) {
    computedAns[n] = nthFibonacci(n - 1) + nthFibonacci(n - 2);
  }
  return computedAns[n];
}

// iteative solution
// O(n) Time | O(1)
function nthFibonacci(n) {
  if (n === 1) return 1;
  let i = 2;
  let firstNum = 0;
  let secondNum = 1;
  let nthFibonacci;
  let fibonacciNums = [0, 1];
  while (i < n) {
    nthFibonacci = firstNum + secondNum;
    firstNum = secondNum;
    secondNum = nthFibonacci;
    fibonacciNums.push(secondNum);
    i++;
  }
  return fibonacciNums;
}
