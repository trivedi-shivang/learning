// give an array, print elements from in spiral fashion
// [
//   [1, 2, 3, 4],
//   [12, 13, 14, 5],
//   [11, 16, 15, 6],
//   [10, 9, 8, 7],
// ];
// it should print 1,2,3,4,5........14,15,16
// O(N) Time | O(N) Space
// function spiralTraverse(arr) {
//   let rowStart = 0;
//   let rowEnd = arr.length - 1;
//   let columnStart = 0;
//   let columnEnd = arr[0].length - 1;
//   let result = [];
//   while (rowStart <= rowEnd && columnStart <= columnEnd) {
//     for (let i = columnStart; i <= columnEnd; i++) {
//       result.push(arr[rowStart][i]);
//     }
//     rowStart++;
//     for (let i = rowStart; i <= rowEnd; i++) {
//       result.push(arr[i][columnEnd]);
//     }
//     columnEnd--;
//     for (let i = columnEnd; i >= columnStart; i--) {
//       result.push(arr[rowEnd][i]);
//     }
//     rowEnd--;
//     for (let i = rowEnd; i >= rowStart; i--) {
//       result.push(arr[i][columnStart]);
//     }
//     columnStart++;
//   }
//   return result;
// }

// recursive solution
// O(n) Time (traversing through all elements in the array) | O(n) Space complexity due to function calls in call-stack(about half of maximum height/width of arr) as well as result array being passed with every function call.
function spiralTraverse(arr) {
  result = [];
  spiralFill(arr, result);
  return result;
}

function spiralFill(
  arr,
  result,
  rowStart = 0,
  rowEnd = arr.length - 1,
  columnStart = 0,
  columnEnd = arr[0].length - 1
) {
  if (rowStart > rowEnd || columnStart > columnEnd) return;
  if (rowStart <= rowEnd && columnStart <= columnEnd) {
    for (let i = columnStart; i <= columnEnd; i++) {
      result.push(arr[rowStart][i]);
    }
    for (let i = rowStart + 1; i <= rowEnd; i++) {
      result.push(arr[i][columnEnd]);
    }
    for (let i = columnEnd - 1; i >= columnStart; i--) {
      result.push(arr[rowEnd][i]);
    }
    for (let i = rowEnd - 1; i > rowStart; i--) {
      result.push(arr[i][columnStart]);
    }
  }
  spiralFill(arr, result, ++rowStart, --rowEnd, ++columnStart, --columnEnd);
}

console.log(
  spiralTraverse([
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7],
  ])
);

console.log(
  spiralTraverse([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
  ])
);

/*
rowStart=1
rowEnd = 2
columnStart =0
columnEnd = 2
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
*/
