// The sort works by assuming the first number is already sorted (consider it as part of sorting space). The code iterates over elements from index i are compared with previous elements until it finds a spot where the element is less than all the elements succeeding it in the sorted area.
// O(n^2) Worst | O(n) Best | O(1) space best/worst
// [5,4,3,2,1]
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let isSwapped = false;
    while (j > 0) {
      if (arr[j] < arr[j - 1]) {
        isSwapped = true;
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
      j--;
    }
  }
  return arr;
}
