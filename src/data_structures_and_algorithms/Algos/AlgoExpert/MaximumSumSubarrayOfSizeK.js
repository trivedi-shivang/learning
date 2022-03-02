// naive approach
// O(N^2) Time | O(1) Space
// function maximumSumSubarrayOfSizeK(arr, k) {
//   let maximumSum = -Infinity;
//   for (let i = 0; i < arr.length - 2; i++) {
//     let sum = 0;
//     for (let j = i; j < i + k; j++) {
//       sum += arr[j];
//     }
//     if (maximumSum < sum) maximumSum = sum;
//   }
//   return maximumSum;
// }

// can use sliding window technique
// O(n) Time | O(1) space
function maximumSumSubarrayOfSizeK(arr, k) {
  let i = 0;
  let j = 0;
  let sumOfKNumbers = 0;
  let maximumSum = -Infinity;
  while (j < arr.length) {
    while (j - i + 1 !== k) {
      sumOfKNumbers += arr[j];
      j++;
    }
    sumOfKNumbers += arr[j];
    if (maximumSum < sumOfKNumbers) {
      maximumSum = sumOfKNumbers;
    }
    sumOfKNumbers -= arr[i];
    i++;
    j++;
  }
  return maximumSum;
}
maximumSumSubarrayOfSizeK([2, 5, 1, 8, 2, 9, 1], 3);
