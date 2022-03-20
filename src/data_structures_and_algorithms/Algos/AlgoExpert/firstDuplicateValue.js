// given an array where all the elements of the array follow the condition:
// 1<=arr[i]<=arr.length
// find the first occurance of the duplicate value

// O(N^2) Time | O(1) Space
function firstDuplicateValue(arr) {
  // minimumDuplicateIndex will never be greater than arr.length
  let minimumDuplicateIndex = arr.length;
  // iterate all elms in the array
  for (let i = 0; i < arr.length - 1; i++) {
    //   since we traversed all elements traversed by index 'i', we need to only traverse all elements "after" i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        if (minimumDuplicateIndex > j) minimumDuplicateIndex = j;
        break;
      }
    }
  }
  return minimumDuplicateIndex === arr.length ? -1 : arr[minimumDuplicateIndex];
}

// store occurance of hash-table
// O(N) Time | O(N) space
function firstDuplicateValue(arr) {
  let elmIndices = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (elmIndices.has(arr[i])) {
      return arr[i];
    } else {
      elmIndices.add(arr[i]);
    }
  }
  return -1;
}

// O(N) Time | O(1)
function firstDuplicateValue(arr) {
  for (let i = 0; i < arr.length; i++) {
    // since all elements are positive and each of them are bounded by the condition 1<=arr[i]<=arr.length
    // we can turn element at index = element's value - 1 to be negative if it is not negative (to indicate we visited that element). If it is negative than that element is already being seen before and thus can be returned as the first duplicate value.
    if (arr[Math.abs(arr[i]) - 1] < 0) return Math.abs(arr[i]);
    else arr[Math.abs(arr[i]) - 1] = -arr[Math.abs(arr[i]) - 1];
  }
  return -1;
}

firstDuplicateValue([2, 4, 1, 1, 2, 4, 4, 3]); // 1
firstDuplicateValue([5, 1, 3, 2, 5, 3]); // 5
