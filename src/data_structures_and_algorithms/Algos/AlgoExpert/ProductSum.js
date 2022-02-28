// O(N) Total elements (including sub-array itself and elements in it)
// O(D) depth of innermost sub-array.
// This examples is pointing you that it will be implemented recursively (since it can have sub-arrays and sub-arrays in su-arrays so on and so forth)
function productSum(arr, multipler = 1) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr[i] = productSum(arr[i], multipler + 1);
    }
    sum += arr[i];
  }
  return sum * multipler;
}

console.log(productSum([5, 2, [7, -1], 3, [6, [-13, 8], 4]]));
