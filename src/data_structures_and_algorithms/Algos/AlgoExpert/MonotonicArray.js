// // given an array, find if it is monotonic. A monotonic array is an array in which all elements are either non-decreasing (adjacent elements can be same but if not then next element is always less than previous elements)
// // or non-increasing.
// // O(N) Time | O(1) Space
// function isMonotonicArray(arr) {
//   // determine if it is nonDecreasing/nonIncreasing
//   let nonIncreasing, nonDecreasing;
//   let i = 0;
//   let j = 1;
//   while (i < arr.length && j < arr.length) {
//     if (!(nonIncreasing || nonDecreasing) && arr[i] === arr[j]) {
//       // do nothing
//     } else if (!(nonDecreasing || nonIncreasing) && arr[i] < arr[j]) {
//       nonIncreasing = true;
//     } else if (!(nonDecreasing || nonIncreasing) && arr[i] > arr[j]) {
//       nonDecreasing = true;
//     }
//     if (nonIncreasing && arr[i] > arr[j]) return false;
//     if (nonDecreasing && arr[i] < arr[j]) return false;
//     i++;
//     j++;
//   }
//   return true;
// }

// checking for monotonicity for every pair
function isMonotonicArray(arr) {
  let i = 0;
  let j = 1;
  let nonDecreasing = false;
  let nonIncreasing = false;
  while (i < arr.length && j < arr.length) {
    if (arr[i] < arr[j]) {
      nonDecreasing = true;
    }
    if (arr[i] > arr[j]) {
      nonIncreasing = true;
    }
    if (nonIncreasing && nonDecreasing) return false;
    i++;
    j++;
  }
  return true;
}

console.log(isMonotonicArray([1, 2, 1])); //false
console.log(isMonotonicArray([1, 2, 3])); //true
console.log(isMonotonicArray([1, 1, 1])); //true
console.log(isMonotonicArray([1, 1, 2])); //true
console.log(isMonotonicArray([1, 1, 2, 2])); //true
console.log(isMonotonicArray([1, 1, 2, 2, 1])); //false
console.log(isMonotonicArray([1, 1, 2, 2, 2])); //true
console.log(isMonotonicArray([1, 1, 2, 2, 3, 4, 4, 1])); //false
console.log(isMonotonicArray([1, 1, 2, 2, 3, 4, 4])); //true
