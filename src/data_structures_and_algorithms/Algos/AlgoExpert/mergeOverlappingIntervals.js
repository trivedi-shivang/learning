// takes non-empty 2-dminesional array. each element in the array is an interval. Each interval is an array that contains 2 values - start and end interval (start < end interval).
// write a function which overlaps any overlapping intervals and return 2-d array where overlapping intervals are merged.

// [[1, 2], [3,5], [4, 7], [6,8], [9,10]] = [[1,2], [3,8], [9,10]]
// O(N^2) Time | O(1) Space
function mergeOverlappingIntervals(arr) {
  let i = 0;
  while (i < arr.length - 1) {
    let j = i + 1;
    while (j < arr.length) {
      if (arr[i][1] >= arr[j][0] && arr[i][0] <= arr[j][0]) {
        // if the next interval is part of current interval
        arr[i + 1][0] = arr[i][0] < arr[i + 1][0] ? arr[i][0] : arr[i + 1][0];
        arr[i + 1][1] = arr[i][1] > arr[i + 1][1] ? arr[i][1] : arr[i + 1][1];
        arr.splice(i, 1);
      } else if (arr[i][0] >= arr[j][0] && arr[i][0] <= arr[j][1]) {
        //current-interval is part of next interval
        arr[i + 1][0] = arr[i][0] < arr[i + 1][0] ? arr[i][0] : arr[i + 1][0];
        arr[i + 1][1] = arr[i][1] > arr[i + 1][1] ? arr[i][1] : arr[i + 1][1];
        arr.splice(i, 1);
      } else {
        j++;
      }
    }
    i++;
  }
  return arr;
}

// O(nlogn) Time (For Sorting mainly) | O(1)
function mergeOverlappingIntervals(arr) {
  arr.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < arr.length - 1; i++) {
    while (i < arr.length - 1 && arr[i][1] >= arr[i + 1][0]) {
      arr[i + 1][0] = arr[i][0];
      arr.splice(i, 1);
    }
  }
  return arr;
}

mergeOverlappingIntervals([
  [1, 2],
  [3, 5],
  [4, 7],
  [6, 8],
  [9, 10],
]); //[[1,2], [3, 8], [9, 10]]

mergeOverlappingIntervals([
  [1, 2],
  [9, 10],
  [6, 8],
  [4, 7],
  [3, 5],
]); //[[1,2], [3, 8], [9, 10]]

// i=0 j=1 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=0 j=2 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=0 j=3 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=0 j=4 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=0 j=5 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=1 j=2 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=1 j=3 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=1 j=4 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=1 j=5 [[1,2], [9, 10], [6,8], [4, 7], [3,5]]
// i=2 j=3 [[1,2], [9, 10], [4, 8], [3,5]]
// i=2 j=4 [[1,2], [9, 10], [3,8]]
// i=2 j=5 [[1,2], [9, 10], [3,8]]
