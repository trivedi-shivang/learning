// three number sum// O(nlog(n))+O(n) O(1)
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
