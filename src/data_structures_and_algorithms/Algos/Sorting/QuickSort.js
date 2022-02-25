// O(nLogN) O(n)
function QuickSort(arr) {
  if (arr.length < 2) return arr;
  let pivotIdx = Math.floor(arr.length / 2);
  let pivot = arr[pivotIdx];
  let left = [];
  let right = [];
  for (let idx in arr) {
    if (idx != pivotIdx) {
      if (arr[idx] < pivot) {
        left.push(arr[idx]);
      } else {
        right.push(arr[idx]);
      }
    }
  }
  return [...QuickSort(left), pivot, ...QuickSort(right)];
}
