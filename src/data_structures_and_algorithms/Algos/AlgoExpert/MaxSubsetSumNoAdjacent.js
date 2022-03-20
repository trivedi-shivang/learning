// given an array of positive integers, find maximum sum without adding up two numbers that are positioned next to each other in the array.
// input: [7, 10, 12, 7, 9, 14]
// output:  7 + 12 + 14 = 33
// o(N-2) Time | O(N) Space
function maxSubsetSumNoAdjacent(arr) {
  if (!arr.length) return arr[0];
  if (arr.length === 1) return Math.max(arr[0], arr[1]);
  maxSums = Array(arr.length).fill(0);
  for (let i = 2; i < arr.length; i++) {
    maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + arr[i]);
  }
  return maxSums[arr.length - 1];
}

// o(N-2) Time | O(1) Space
function maxSubsetSumNoAdjacent(arr) {
  if (!arr.length) return arr[0];
  if (arr.length === 1) return Math.max(arr[0], arr[1]);
  a = arr[0];
  b = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    let temp = b;
    b = Math.max(b, a + arr[i]);
    a = temp;
  }
  return Math.max(a, b);
}

maxSubsetSumNoAdjacent([7, 10, 12, 7, 9, 14]); //33
