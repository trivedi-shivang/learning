// input: elements sorted in asc
// target to found in the input using Binary Search
// O(log(n)) Time | O(1)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return "found";
    else if (arr[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return "not found";
}

// implemented with order-agnostic binary-search (does not care if arr is sorted in asc or desc)
function binarySearch(arr, target) {
  let ascSort = true;
  if (arr[0] > arr[arr.length - 1]) {
    ascSort = false;
  }
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return "found";
    else if (
      (arr[middle] < target && ascSort) ||
      (arr[middle] > target && !ascSort)
    ) {
      left = middle + 1;
    } else if (
      (arr[middle] < target && !ascSort) ||
      (arr[middle] > target && ascSort)
    ) {
      right = middle - 1;
    }
  }
  return "not found";
}
