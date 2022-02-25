// sorted squared array
//O(n) O(n)
function sortedSquaredArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  let result = Array(arr.length).fill(0);
  let resultIdx = arr.length - 1;
  while (left <= right) {
    if (Math.abs(arr[left]) > Math.abs(arr[right])) {
      result[resultIdx] = Math.pow(arr[left], 2);
      left++;
    } else {
      result[resultIdx] = Math.pow(arr[right], 2);
      right--;
    }
    resultIdx--;
  }
  return result;
}
