// initially all elements in the array are unsorted. every unsortFirstElmIdx iteation looks for minimum element in the unsorted array and replaces that element with first element in the unsorted array.
// O(n^2) Time | O(1)
function selectionSort(arr) {
  for (
    let unsortFirstElmIdx = 0;
    unsortFirstElmIdx < arr.length;
    unsortFirstElmIdx++
  ) {
    // in each iteration, find the smallest element and unshift to the starting of the arr (sorted sublist)
    let minElm = arr[unsortFirstElmIdx];
    let minElmIdx = unsortFirstElmIdx;
    for (
      let unSortElmIdx = unsortFirstElmIdx + 1;
      unSortElmIdx < arr.length;
      unSortElmIdx++
    ) {
      if (arr[unSortElmIdx] < minElm) {
        minElmIdx = unSortElmIdx;
        minElm = arr[unSortElmIdx];
      }
    }
    // swap minElm with first element in the unsorted list
    [arr[unsortFirstElmIdx], arr[minElmIdx]] = [
      arr[minElmIdx],
      arr[unsortFirstElmIdx],
    ];
  }
  return arr;
}
