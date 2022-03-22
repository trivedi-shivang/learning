// given two strings, find minimum number of edit operations that can be performed to convert one string ton another string. These edit operations can be insertion, substitution or deletion of a letter
// approach we initialized "edits" matrix with str1 characters as rows and str2 characters as columns. Assuming the edge case

//     ''  y   a   b   d
// ''  0   1   2   3   4
// a   1   1   1   2   3
// b   2   2   2   1   2
// c   3   3   3   2   2

// Here observations can be made which are indicated in the algorithm
// O(N*M) Time | O(N*M) where N is the size of str1 and M is size of str2
function levenshteinDistance(str1, str2) {
  //why str1.length+1 because we are considering the edge case where one of the strings is empty string and other is not.
  let edits = Array(str1.length + 1)
    .fill(0)
    .map((_) => Array(str2.length + 1).fill(0));
  for (let i = 0; i < str1.length + 1; i++) {
    for (let j = 0; j < str2.length + 1; j++) {
      if (i === 0) {
        edits[i][j] = j; //initialized first row
      }
      if (j === 0) {
        edits[i][j] = i; //initialized first column
      }
      if (i !== 0 && j !== 0) {
        if (str1[i - 1] === str2[j - 1]) {
          edits[i][j] = edits[i - 1][j - 1];
        } else {
          edits[i][j] =
            1 + Math.min(edits[i - 1][j - 1], edits[i - 1][j], edits[i][j - 1]);
        }
      }
    }
  }
  return edits[str1.length][str2.length];
}

// O(N*M) Time two for loops | O(min(N,M)) Space to store column values of two rows.
function levenshteinDistance(str1, str2) {
  let small = str1.length < str2.length ? str1 : str2; //smallest string
  let big = str1.length >= str2.length ? str1 : str2; //biggest string
  let evenEdits = Array(small.length + 1);
  let oddEdits = Array(small.length + 1).fill(null);
  for (let i = 0; i <= small.length; i++) {
    evenEdits[i] = i; // fill out first row
  }
  for (let i = 1; i <= big.length; i++) {
    //for every row
    if (i % 2 === 1) {
      // if the row index is odd
      currentEdits = oddEdits; //this is current-row
      previousEdits = evenEdits; //this is previous row
    } else {
      currentEdits = evenEdits; //when its even indexed row, 
      previousEdits = oddEdits;
    }
    currentEdits[0] = i; //for every row i, value to be populated for the first column
    for (let j = 1; j <= small.length; j++) {
      if (big[i - 1] === small[j - 1]) {
        currentEdits[j] = previousEdits[j - 1];
      } else {
        currentEdits[j] =
          1 +
          Math.min(previousEdits[j - 1], previousEdits[j], currentEdits[j - 1]);
      }
    }
  }
  return big.length % 2 === 0
    ? evenEdits[small.length]
    : oddEdits[small.length];
}

console.log(levenshteinDistance("abc", "yabd")); //2
