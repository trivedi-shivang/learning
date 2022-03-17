//  given an array of n elements. not necessarily sorted. contains mix integers (positive/negative). return an array of products of all elements of the input array except the element at the index.
// arr = [5, 1, 4, 2]
// result = [8, 40, 10, 20]
// at index = 0, 8 is found by multiplying all elements except the element at first index = 1 * 4 * 2

// O(N) Time (to iterate all elements and pushing them in result)
// O(N) Space result array size
function arrayOfProducts(arr) {
  //   find product of all elements
  let product = 1;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    product *= arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    result.push(product / arr[i]);
  }
  return result;
}

// O(N^2) Time (two loops) | O(N) result array space
function arrayOfProducts(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let j = 0;
    let runningProduct = 1;
    while (j < arr.length) {
      if (j !== i) {
        runningProduct *= arr[j];
      }
      j++;
    }
    result.push(runningProduct);
  }
  return result;
}

// without division operator (used in first approach above)
// O(N) Time | O(N) Space
function arrayOfProducts(arr) {
  // find left-running-products of all elements at corresponding index
  let leftRunningProduct = 1;
  let rightRunningProduct = 1;
  let leftRunningProductsArr = [];
  let rightRunningProductsArr = [];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    leftRunningProductsArr.push(leftRunningProduct);
    leftRunningProduct *= arr[i];
  }
  //   this loop will keep track of product of all elements which are on RHS of the current element and storing that product in an array
  for (let i = arr.length - 1; i >= 0; i--) {
    rightRunningProductsArr.unshift(rightRunningProduct);
    rightRunningProduct *= arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    result.push(leftRunningProductsArr[i] * rightRunningProductsArr[i]);
  }
  return result;
}

// same as prev approach but removed 2 arrays and 2 runningProduct variables
// O(N) Time | O(N)
function arrayOfProducts(arr) {
  let runningProduct = 1;
  let result = [];
  //   this loop will keep track of product of all elements which are on LHS of the current element.
  for (let i = 0; i < arr.length; i++) {
    result.push(runningProduct);
    runningProduct *= arr[i];
  }
  runningProduct = 1; //resetting since we are using the same variable.
  //   this loop will keep track of product of all elements which are on RHS of the current element. Also multiplying RHS product with current result element.
  for (let i = arr.length - 1; i >= 0; i--) {
    result[i] *= runningProduct;
    runningProduct *= arr[i];
  }
  return result;
}

arrayOfProducts([5, 1, 4, 2]);
