function InsertionSort(arr) {
  if (!arr || !Array.isArray(arr) || !arr.length) return;
  if (arr.length === 1) return arr;
  for (let i = 1; i < arr.length; i++) {
    let current = i;
    for (let j = current - 1; j >= 0; j--) {
      if (arr[j] > arr[current]) {
        let swap = arr[j];
        arr[j] = arr[current];
        arr[current] = swap;
        current = j;
      }
    }
  }
  return arr;
}

InsertionSort([5, 4, 3, 2, 1]);
