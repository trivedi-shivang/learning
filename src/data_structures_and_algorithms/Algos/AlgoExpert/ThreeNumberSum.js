// three number sum// O(nlog(n))+O(n) O(1)
// only returns a combination
function threeNumberSum(arr, target) {
  arr.sort();
  let num1Idx = 0;
  let num2Idx = arr.length - 2;
  let num3Idx = arr.length - 1;
  while (num1Idx < num2Idx && num1Idx < num3Idx) {
    if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] === target)
      return [arr[num1Idx], arr[num2Idx], arr[num3Idx]];
    else {
      if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] < target) num1Idx++;
      else if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] > target) {
        num2Idx--;
        if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] > target) num3Idx--;
      }
    }
  }
  return -1;
}

// returns multiple combinations
// O(Nlog(N)) + O(N^2) = O(N^2) Time (O(N) for iterating currentNumberIdx and O(N) for inner while loop which iterates through n-1 elements)
// O(N) space since there is a posibility that there could be many combinations and it might all the array elements.
function threeNumberSum(arr, target) {
  // sorting is important and has to happen in order to successfully work.
  arr.sort((a, b) => a - b);
  let currentNumberIdx = 0;
  let leftIdx = currentNumberIdx + 1;
  let rightIdx = arr.length - 1;
  let results = [];
  while (currentNumberIdx < arr.length - 2) {
    while (leftIdx < rightIdx) {
      if (arr[currentNumberIdx] + arr[leftIdx] + arr[rightIdx] === target) {
        results.push([arr[currentNumberIdx], arr[leftIdx], arr[rightIdx]]);
        // if we only increment leftIdx, for sure we will get total of those numbers to be greater than target. Similarly, only decrementing only rightIdx will give total less than target. Hence changing both gives us a possibility that we might get total equal to target.
        leftIdx++;
        rightIdx--;
      } else if (
        arr[currentNumberIdx] + arr[leftIdx] + arr[rightIdx] <
        target
      ) {
        leftIdx++;
      } else {
        rightIdx--;
      }
    }
    currentNumberIdx++;
    leftIdx = currentNumberIdx + 1;
    rightIdx = arr.length - 1;
  }
  return results.length ? results : -1;
}

threeNumberSum([-8, -6, 1, 2, 3, 5, 6, 12], 0);
