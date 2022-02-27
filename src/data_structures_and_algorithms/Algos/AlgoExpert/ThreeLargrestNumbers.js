// find three largrest numbers from the array and return a new array containing those three-numbers in ascending order.

function threeLargestNumbers(arr, m) {
  let result = [];
  for (let i = 0; i < m; i++) {
    let maxElm = arr[0];
    let k = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > maxElm) {
        k = j;
        maxElm = arr[j];
      }
    }
    result = result.concat(arr.splice(k, 1));
  }
  return result;
}

//another implementation
// O(n) Time | O(m) space
function threeLargestNumbers(arr, m) {
  let result = Array(m);
  for (let i = 0; i < arr.length; i++) {
    for (let m = result.length - 1; m >= 0; m--) {
      //   two step process
      // find the spot where we need to insert arr[i]
      if (result[m] < arr[i] || !result[m]) {
        let temp = result[m];
        result[m] = arr[i];
        // after finding the spot, shift all elements from index m to 0 by 1
        for (let j = m - 1; j > 0; j--) {
          [result[j], temp] = [temp, result[j]];
        }
        result[0] = temp;
        break;
      }
    }
  }
  return result;
}

//another implementation
function findThreeLargestNumbers(arr) {
  let threeLargestNumbers = Array(3);
  for (let num of arr) {
    updateLargest(threeLargestNumbers, num);
  }
  return threeLargestNumbers;
}

function updateLargest(arr, num) {
  if (arr[2] < num || !arr[2]) {
    shiftAndUpdate(2, num, arr);
  }
  if (arr[1] < num || !arr[1]) {
    shiftAndUpdate(1, num, arr);
  }
  if (arr[0] < num || !arr[0]) {
    shiftAndUpdate(0, num, arr);
  }
}

function shiftAndUpdate(idx, num, arr) {
  for (let i in arr.length - 1) {
    if (i === idx) {
      arr[i] = num;
    } else {
      arr[i] = arr[i + 1];
    }
  }
}
