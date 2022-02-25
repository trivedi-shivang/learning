// four number sum// O(nlog(n))+O(n) O(1)
function fourNumberSum(arr, target) {
  arr.sort();
  let num1Idx = 0;
  let num2Idx = 1;
  let num3Idx = arr.length - 2;
  let num4Idx = arr.length - 1;
  while (
    num1Idx < num3Idx &&
    num1Idx < num4Idx &&
    num2Idx < num3Idx &&
    num2Idx < num4Idx
  ) {
    if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] + arr[num4Idx] === target)
      return [arr[num1Idx], arr[num2Idx], arr[num3Idx], arr[num4Idx]];
    else {
      if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] + arr[num4Idx] < target) {
        num2Idx++;
        if (
          arr[num1Idx] + arr[num2Idx] + arr[num3Idx] + arr[num4Idx] <
          target
        ) {
          num1Idx++;
        }
      } else if (
        arr[num1Idx] + arr[num2Idx] + arr[num3Idx] + arr[num4Idx] >
        target
      ) {
        num3Idx--;
        if (arr[num1Idx] + arr[num2Idx] + arr[num3Idx] + arr[num4Idx] > target)
          num4Idx--;
      }
    }
  }
  return -1;
}
