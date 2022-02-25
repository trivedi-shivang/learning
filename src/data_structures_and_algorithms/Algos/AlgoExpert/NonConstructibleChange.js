function nonConstructibleChange(arr) {
  let change = 0;
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] - change > 1) return change + 1;
    else change += arr[i];
  }
  return change + 1;
}
