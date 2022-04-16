// given an array of positive integers, find maximum sum without adding up two numbers that are positioned next to each other in the array.
// input: [7, 10, 12, 7, 9, 14]
// output:  7 + 12 + 14 = 33
// o(N-2) Time | O(N) Space

// explaination: can be solved using dynamic programming. can generate an output array where element at each index is maximum-sum of all up until element at the given i/p array index.
// [7, 10, 19, 19, 28, 33];
// for ex: 33 above can maximum of 28 or it can be 19 + 14 (where 14 is from the i/p array). why not 28 + 14? because 28 consist of a possibility that it might have added corresponding element index (which is 9) to form it. Thus, adding 9 to 14 would violate the requirement given in the problem.
function maxSubsetSumNoAdjacent(arr) {
  if (!arr.length) return;
  if (arr.length === 1) return arr[0];
  maxSums = Array(arr.length);
  maxSums[0] = arr[0];
  maxSums[1] = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + arr[i]);
  }
  return maxSums[arr.length - 1];
}

// o(N-2) Time | O(1) Space
function maxSubsetSumNoAdjacent(arr) {
  if (!arr.length) return;
  if (arr.length === 1) return arr[0];
  let second = arr[0];
  let first = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    let current = Math.max(first, second + arr[i]);
    second = first;
    first = current;
  }
  return first;
}

maxSubsetSumNoAdjacent([7, 10, 12, 7, 9, 14]); //33
