function maximumOfSubArraysOfSizeK(arr, k) {
  let i = 0;
  let j = 0;
  let result = [];
  let maxNumbers = [];
  while (j < arr.length) {
    while (j - i + 1 < k) {
      if (!maxNumbers.length || arr[j] > maxNumbers[0]) {
        maxNumbers = [];
      }
      maxNumbers.push(arr[j]);
      j++;
    }
    if (j - i + 1 === k) {
      if (arr[j] > maxNumbers[0]) {
        maxNumbers = [];
      }
      maxNumbers.push(arr[j]);

      result.push(maxNumbers[0]);
      if (maxNumbers[0] === arr[i]) {
        maxNumbers.shift();
      }
      i++;
      j++;
    }
  }
  return result;
}
maximumOfSubArraysOfSizeK([1, 3, -1, -3, 5, 3, 6, 7], 3);
