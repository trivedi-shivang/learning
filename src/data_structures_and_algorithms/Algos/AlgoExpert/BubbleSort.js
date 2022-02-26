// in first iteration largest element is bubbled to the end. in second iteration second largest so on so forth.
// O(n^2) (Worst) | O(n) Time | O(1) space
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // checks if swap has happened
    let isSwapped = false;
    for (let j = 0; j < arr.length - (1 + i); j++) {
      if (arr[j] > arr[j + 1]) {
        isSwapped = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    // if no swap has happened in entire single iteation, return array
    if (!isSwapped) return arr;
  }
}

console.log(bubbleSort([5, 4, 3, 2, 1]));
