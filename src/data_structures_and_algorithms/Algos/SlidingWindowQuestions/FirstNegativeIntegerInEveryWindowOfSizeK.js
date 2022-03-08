// store first -ve number in window of size k in "result". store 0 if no -ve numbers in sliding window.
// O(N) Time (Iterating all elements once) | O(N) queue + (minor O(n-k+1) for "result")
function firstNegInWinK(arr, k) {
  let i = 0;
  let j = 0;
  let queue = [];
  let result = [];
  while (j < arr.length) {
    while (j - i + 1 !== k) {
      if (arr[j] < 0) {
        queue.push(arr[j]);
      }
      j++;
    }
    if (arr[j] < 0) {
      queue.push(arr[j]);
    }
    if (j - i + 1 === k) {
      if (queue.length) {
        result.push(queue[0]);
        // checks if the first queue element is the first element in sliding window or not
        if (queue[0] === arr[i]) {
          queue.shift();
        }
      } else {
        result.push(0);
      }
    }
    i++;
    j++;
  }
  return result;
}
firstNegInWinK([12, -1, -7, 8, -15, 30, 16, 28], 3);
