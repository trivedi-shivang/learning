// given an array and an integer k, return the maximum size of the subarray whose elements when added equals to k.
// possible subarrays: [5], [2,3], [4,1], [1,1,1,2] => return 4 size of [1,1,1,2]
function largestSubArrayOfSumK(arr, k) {
  let i = 0;
  let j = 0;
  let maxSubArraySize = 0;
  let sum = 0;
  while (j < arr.length) {
    sum += arr[j];
    if (sum < k) {
      j++;
    } else if (sum === k) {
      maxSubArraySize = Math.max(maxSubArraySize, j - i + 1);
      j++;
    } else if (sum > k) {
      while (sum > k) {
        sum -= arr[i];
        i++;
      }
      j++;
    }
  }
  return maxSubArraySize;
}

largestSubArrayOfSumK([4, 1, 1, 1, 2, 3, 5], 5);
