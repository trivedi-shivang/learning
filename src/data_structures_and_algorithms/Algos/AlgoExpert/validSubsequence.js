// Is the subseqArr subsequence of arr? (All elements of subseqArr should be in arr in the same order as they appear in suseqArr)//Those subseqArr numbers do not have to be adjacent to each other in arr.K//O(arr.length) O(1)
function validSubsequence(arr, subseqArr) {
  let i = 0;
  let j = 0;
  while (i < arr.length && j < subseqArr.length) {
    if (subseqArr[j] === arr[i]) {
      j++;
    }
    i++;
  }
  return j === subseqArr.length ? true : false;
}

// same function but implemented using for loop
function validSubsequence(arr, subseqArr) {
  let subseqIdx = 0;
  for (val of arr) {
    if (val === arr[subseqArr]) {
      subseqIdx++;
    }
    if (subseqIdx === subseqArr.length) return true;
  }
  return false;
}
