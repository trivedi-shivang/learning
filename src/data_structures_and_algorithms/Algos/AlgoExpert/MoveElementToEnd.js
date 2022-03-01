// move all elements in the arr (which matches "target" integer) to the end of the array with O(1) space complexity. The order of non-target elements in the final result do not matter
// O(N) Time | O(1) Space
function moveElementToEnd(arr, target) {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    while (arr[i] !== target) {
      i++;
    }
    while (arr[j] === target) {
      j--;
    }
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

moveElementToEnd([2, 1, 2, 2, 2, 3, 4, 2], 2);
