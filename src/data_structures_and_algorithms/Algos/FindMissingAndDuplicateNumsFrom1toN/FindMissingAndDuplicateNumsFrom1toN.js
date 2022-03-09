// given an array of size n from 1toN, find all possible
function findMissingAndDuplicateNumsfrom1toN(arr) {
  let i = 0;
  let result = [];
  while (true) {
    if (i === arr.length) break;
    //   iterate i until you find an element whose difference from prev element is greater than 1
    while ((i === 0 && arr[i] === 1) || arr[i] === arr[i - 1] + 1) {
      i++;
    }
    result.push([arr[i], arr[i - 1] + 1]);
    arr[i] = arr[i - 1] + 1;
    i++;
  }
  return result;
}

findMissingAndDuplicateNumsfrom1toN([1, 4, 4, 4, 4]);

// another approach
function findMissingAndDuplicateNumsfrom1toN(arr) {
  let i = 0;
  let result = [];
  while (i < arr.length) {
    if (arr[i] !== i + 1) {
      // swap arr[i] with arr[arr[i]-1]
      let temp = arr[arr[i] - 1];
      arr[arr[i] - 1] = arr[i];
      arr[i] = temp;
    }
    i++;
  }
  i = 0;
  while (i < arr.length) {
    if (arr[i] !== i + 1) {
      result.push(arr[i], i + 1);
    }
    i++;
  }
  return result;
}
findMissingAndDuplicateNumsfrom1toN([2, 3, 1, 5, 1]);
