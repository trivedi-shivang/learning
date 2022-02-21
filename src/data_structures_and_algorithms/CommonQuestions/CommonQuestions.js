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
