// Two Number Sum
// Brute Force O(n2) O(1)
function twoNumberSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <= arr.length; j++) {
      if (j !== i) {
        if (arr[j] + arr[i] === target) {
          return [arr[j], arr[i]];
        }
      }
    }
  }
  return -1;
}

// Using hash-table/dictionary
// O(n) O(n)
function twoNumberSum(arr, target) {
  let dict = {};
  for (let i = 0; i < arr.length; i++) {
    if (target - arr[i] in dict) {
      return [arr[i], target - arr[i]];
    } else {
      dict[arr[i]] = true;
    }
  }
  return -1;
}

// O(nlogn) +O(n) O(1 )
function twoNumberSum(arr, target) {
  // sort arr first
  arr.sort();
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] + arr[right] === target) return [arr[left], arr[right]];
    else {
      if (arr[left] + arr[right] < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  return -1;
}
