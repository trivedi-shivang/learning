// O(m+n) O(m)
function isValidAnagram(s1, s2) {
  let s1CharFreq = {};
  if (!s1 || !s2) return;
  if (s1.length != s2.length) return false;
  //   traverse s1 characters and store in an object
  for (let i = 0; i < s1.length; i++) {
    if (s1CharFreq[s1[i]]) {
      s1CharFreq[s1[i]] += 1;
    } else {
      s1CharFreq[s1[i]] = 1;
    }
  }

  //   traverse s2 characters and compare if the characters and their frequencies are same or not
  for (let i = 0; i < s2.length; i++) {
    if (!(s2[i] in s1CharFreq)) return false;
    if (s1CharFreq[s2[i]]) {
      s1CharFreq[s2[i]] -= 1;
    }
  }

  return Object.values(s1CharFreq).every((val) => val === 0);
}

isValidAnagram("garden", "danger");

// Find an element in a sorted array iteratively
function findTargetInSortedArray(arr, target) {
  if (!arr || !target) return;
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (start <= end) {
    //   search left half of the array
    if (target < arr[middle]) {
      end = middle - 1;
    } else if (target > arr[middle]) {
      start = middle + 1;
    } else {
      return "target found in the array";
    }
  }
  return "target not found in the array";
}

// Find an element in a sorted array recursively
function findTargetInSortedArray(arr, target, start, end) {
  if (!arr || !target) return;
  start = start || 0;
  end = end || arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  if (start > end) return "not found";
  //   search left half of the array
  if (target === arr[middle]) {
    return "found";
  } else {
    if (target < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    return findTargetInSortedArray(arr, target, start, end);
  }
}

findTargetInSortedArray([1, 2, 3, 4, 5], 2);

// find a target in sorted matrix using linear search
// O(m*n) O(1)
function targetInMatrix(arr, target) {
  if (!target || !arr || Array.isArray(arr));
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === target) return "found";
    }
  }
  return "not found";
}

console.log(targetInMatrix([[1], [2], [3]], 1));
console.log(targetInMatrix([[1], [2], [3]], 20));

// using binary search
// O(logm)O(logn) O(1)
function targetInMatrix(arr, target) {
  if (!target || !arr || Array.isArray(arr));
  //   start with the rightmost element.
  // if the element matches with the target; return
  // if the element is greater than the target reduce col count
  // if the element is less than the target increase row count
  let row = 0;
  let col = arr.length - 1;
  while (row <= col) {
    if (arr[row][col] === target) return "found";
    else {
      if (arr[row][col] > target) {
        col--;
      } else {
        row++;
      }
    }
  }
  return "not found";
}

console.log(
  targetInMatrix(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1
  )
);
console.log(
  targetInMatrix(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    20
  )
);

// find the symmetric difference using brute-force
let result = [];
function symDiff(arr1, arr2) {
  // return [
  //   arr1.filter((val) => !arr2.includes(val)),
  //   arr2.filter((val) => !arr1.includes(val)),
  // ];

  for (let val of arr1) {
    if (!arr2.indexOf(val)) {
      result.push(val);
    }
  }
  for (let val of arr2) {
    if (!arr1.indexOf(val)) {
      result.push(val);
    }
  }
  return result;
}
function sym() {
  let args = Array.prototype.slice.call(arguments);
  return new Set(args.reduce(symDiff));
}

// find the symmetric difference using hashmap
// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/find-the-symmetric-difference
// O(n) O(n)
let symDiffObj = {};
function symDiff(symDiffObj, arr) {
  let setArr = new Set(arr);
  for (let val in setArr) {
    if (val in symDiffObj) {
      delete symDiffObj[val];
    } else {
      symDiffObj[val] = true;
    }
  }
  return symDiffObj;
}
function sym() {
  const result = [...arguments].reduce(symDiff, symDiffObj);
  return Object.keys(result).map((val) => parseInt(val));
}

// Ceiling of a number using binary search
function ceilingNumberInArr(arr, target) {
  if (!arr || !Array.isArray(arr)) return;
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.round((left + right) / 2);
    if (target === arr[middle]) return arr[middle];
    else {
      if (target > arr[middle]) left = middle + 1;
      else right = middle - 1;
    }
  }
  return arr[left] || -1;
}

ceilingNumberInArr([2, 3, 5, 9, 14, 16, 18], 10);

// smallest letter greater than the target
function letterGreaterThanTarget(str, target) {
  if (!str) return;
  let arr = str.split("");
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.round((left + right) / 2);
    if (target.charCodeAt() >= arr[middle].charCodeAt()) left = middle + 1;
    else right = middle - 1;
  }
  return arr[left] || -1;
}

letterGreaterThanTarget("cfj", "a"); // c
letterGreaterThanTarget("cfj", "c"); // f

// using brute force approach
// O(n) O(1)
function minAndMaxPosition(arr, target) {
  if (!arr || !Array.isArray(arr)) return;
  let start = -1;
  let end = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      start = i;
      break;
    }
  }
  if (start !== -1) {
    for (let j = start; j < arr.length; j++) {
      if (arr[j] === target) {
        end = j;
      }
    }
  }
  return [start, end];
}

minAndMaxPosition([5, 7, 8, 8, 8, 10], 8);

// using two-pointers approach
// O(n) O(1)
function minAndMaxPosition(arr, target) {
  if (!arr || !Array.isArray(arr)) return;
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    while (arr[start] < target) {
      start++;
    }
    while (arr[end] > target) {
      end--;
    }
    if (start <= end) {
      return [start, end];
    }
  }
  return [-1, -1];
}

minAndMaxPosition([5, 7, 8, 8, 8, 10], 8);

// using binary tree
function elementPositionInArray(arr, target, findStartIndex) {
  if (!arr || !Array.isArray(arr)) return;
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) {
      ans = middle;
      if (findStartIndex) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      if (arr[middle] > target) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
  }
  return ans;
}

function minAndMaxPosition(arr, target) {
  let start = elementPositionInArray(arr, target, true);
  let end = elementPositionInArray(arr, target, false);
  return !start ? [-1, -1] : [start, end];
}

minAndMaxPosition([5, 7, 8, 8, 8, 10], 8);

// find target element in array of infinite size  (cannot use arr.length)
function findSearchWindow(arr, target) {
  let start = 0;
  let end = 1;
  let windowSize = 2;
  while (arr[end] !== undefined && target >= arr[end]) {
    // if (arr[end] < target) {
    start = end + 1;
    windowSize *= 2;
    // if (!arr[start + windowSize]) {
    //   end =
    // };
    end = start + windowSize;
    // }
  }
  return [start, end];
}
function findTargetInWindow(arr, target, left, right) {
  // let left = 0;
  // let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return target;
    else {
      if (arr[middle] < target) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }
}

function findTargetInArray(arr, target) {
  let [start, end] = findSearchWindow(arr, target);
  return findTargetInWindow(arr, target, start, end);
}

findTargetInArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 14);

// O(logN) O(1)
function findPeakInMountainArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (left === right) return left;
    if (arr[middle + 1] > arr[middle]) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }
}

findPeakInMountainArray([1, 16, 8, 4, 2, 1]);

function binarySearch(arr, target, left, right) {
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return middle;
    else {
      if (arr[left] < arr[right]) {
        if (arr[middle] < target) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      } else {
        if (arr[middle] < target) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      }
    }
  }
  return -1;
}

function targetPosInMountainArray(arr, target) {
  let maxIndex = findPeakInMountainArray(arr);
  let startIndex = binarySearch(arr, target, 0, maxIndex);
  if (startIndex === -1) {
    let endIndex = binarySearch(arr, target, maxIndex, arr.length - 1);
    if (endIndex !== -1) {
      return endIndex;
    } else {
      return -1;
    }
  } else {
    return startIndex;
  }
}
targetPosInMountainArray([1, 16, 8, 4, 2, 1], 8);

// find element in rotated sorted array
function search(nums, target) {
  let pivot = findPivot(nums);
  // if you did not find a pivot, it means the array is not sorted
  if (pivot === -1) {
    return binarySearch(nums, target, 0, arr.length - 1);
  }
  if (nums[pivot] === target) {
    return pivot;
  } else if (target > nums[0]) {
    return binarySearch(nums, target, 0, pivot);
  } else {
    return binarySearch(nums, target, pivot, arr.length - 1);
  }
}

function findPivot(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (mid < end && arr[mid] > arr[mid + 1]) {
      return mid;
    }
    if (mid > start && arr[mid] < arr[mid - 1]) {
      return mid - 1;
    }
    if (arr[mid] <= arr[start]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
}

search([4, 5, 6, 7, 0, 1, 2], 5);
