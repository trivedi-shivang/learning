// move all elements in the arr (which matches "target" integer) to the end of the array with O(1) space complexity. The order of non-target elements in the final result do not matter

// no matter what we need to iterate through all elements since we need to make sure all target elements are at the end.
// Thus, time complexity cannot be less than O(N)

// cannot do binary search without sorting array.

// O(NlogN) Time | O(1)
// function moveElementToEnd(arr, target) {
//   arr.sort((a, b) => a - b);
//   let leftIdx = 0;
//   let rightIdx = arr.length - 1;
//   while (arr[leftIdx] !== target) {
//     leftIdx++;
//   }
//   while (leftIdx < rightIdx || arr[leftIdx] === arr[rightIdx]) {
//     let temp = arr[leftIdx];
//     arr[leftIdx] = arr[rightIdx];
//     arr[rightIdx] = temp;
//     leftIdx++;
//     rightIdx--;
//   }
//   return arr;
// }

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

// above approach but with slightly different implementation
// O(N) Time | O(1)
function moveElementToEnd(arr, target) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  while (leftIdx < rightIdx) {
    while (leftIdx < rightIdx && arr[rightIdx] === target) {
      rightIdx--;
    }
    if (arr[leftIdx] === target) {
      [arr[leftIdx], arr[rightIdx]] = [arr[rightIdx], arr[leftIdx]];
    }
    leftIdx++;
  }
  return arr;
}
