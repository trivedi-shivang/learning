// two arrays given. find a pair of two numbers (one number from each array) such that the difference of the pair is least.
// naive approach
// O(m*n) where m is the length of arr1 and n is length of arr2.
function smallestDifference(arr1, arr2) {
  if (
    !arr1 ||
    !arr2 ||
    !Array.isArray(arr1) ||
    !Array.isArray(arr2) ||
    arr1.length === 0 ||
    arr2.length === 0
  )
    return;
  let smallestDiff = [arr1[0], arr2[0]];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (
        Math.abs(arr1[i] - arr2[j]) <
        Math.abs(smallestDiff[1] - smallestDiff[0])
      ) {
        smallestDiff = [arr1[i], arr2[j]];
      }
    }
  }
  return smallestDiff;
}

smallestDifference([1, 2], [9, 15]);

// sorted-array properties technique
// O(Nlog(N)) +O(Mlog(M)) Time | O(1) Space
function smallestDifference(arr1, arr2) {
  // sort arrays
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  let arr1Idx = 0;
  let arr2Idx = 0;
  let smallestDiff = [arr1[arr1Idx], arr2[arr2Idx]];
  while (arr1Idx < arr1.length && arr2Idx < arr2.length) {
    if (arr1[arr1Idx] === arr2[arr2Idx]) return [arr1[arr1Idx], arr2[arr2Idx]];
    if (
      Math.abs(arr1[arr1Idx] - arr2[arr2Idx]) <
      Math.abs(smallestDiff[1] - smallestDiff[0])
    ) {
      smallestDiff = [arr1[arr1Idx], arr2[arr2Idx]];
    }
    if (arr1[arr1Idx] < arr2[arr2Idx]) {
      arr1Idx++;
    } else {
      arr2Idx++;
    }
  }
  return smallestDiff;
}

console.log(smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17]));
