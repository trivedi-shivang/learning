// find the length of the longest peak in the array.
// A peak is atleast 3 consecutive integers in the array. Those integer when read from left are right which is strictly increasing and then strictly decreasing.
// O(N) Time = O(N) to traverse all elements of the array + O(M) - which is less than O(N) where M is time to iterate elements to find length of possible peak.
// O(1) Space

// if the element has no peaks then O(N) Time (for all elements traversal) | O(1) Space
function findLongestPeakLength(arr) {
  // find all peaks in the array
  let longestPeakLength = 0;
  let idx = 1; // peaks cannot be first/last values in the array since that will violate peak condition
  while (idx < arr.length - 1) {
    if (arr[idx] > arr[idx - 1] && arr[idx] > arr[idx + 1]) {
      // we found one of the possible peaks
      // now find length of the peak
      let leftIdx = idx - 1;
      while (leftIdx >= 0 && arr[leftIdx - 1] < arr[leftIdx]) {
        leftIdx--;
      }
      let rightIdx = idx + 1;
      while (rightIdx < arr.length - 1 && arr[rightIdx + 1] < arr[rightIdx]) {
        rightIdx++;
      }
      let peakLength = rightIdx - leftIdx + 1;
      if (longestPeakLength < peakLength) {
        longestPeakLength = peakLength;
      }
      idx = rightIdx;
    } else {
      idx += 1;
    }
  }
  return longestPeakLength;
}

findLongestPeakLength([1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]);
