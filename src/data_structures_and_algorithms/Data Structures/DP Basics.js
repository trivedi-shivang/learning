// If you know you need to apply recursive implementation then you can use DP.

// Knapsack problem:
// There are three types of knapsack problem: Fractional Knapsack (Greedy), 0/1 and Unbounded Knapsack. What is knapsack?
// Consider a bag of items. Each item has a weight and a value.  We need to find items which will have maximum profit.

// Consider the same bag has capacity of 10kg. 9kg is already filled. 1kg is left. Fractional knapsack is used when the problem allows any 2kg item to be cut it half and can be put in bag to fill the bag.

// The same bag, if it does not allow partial items then 0/1 knapsack approach is used. That item can only be allowed once to be put inside the bag.

// Unbounded knapsack is similar to 0/1 but instead of allowing each item to use only once. You can use the same item multiple times.

// How to identify if a problem is DP or not? If the problem allows to have a choice if to pick an item or not and if the problem is asking to find optimal solution (like maximum, minimum, largest, smallest, greatest) then DP can be applied.

// Each DP problem: FIRST IDENTIFY RECURSIVE SOLUTION

// For recursive function: find base case. base case is smallest valid input.  every function should call on smaller input.

let itemWeights = [1, 3, 4, 5];
let itemValues = [1, 4, 5, 7];
let knapsackCapacity = 7;
let itemWeightsLength = itemWeights.length;

function knapsack(
  itemWeights,
  itemValues,
  knapsackCapacity,
  itemWeightsLength
) {
  // if there is no more room to add item or if there are no items given
  if (knapsackCapacity === 0 || itemWeightsLength === 0) return 0;
  // we can only include the item if its weight is less than knapsack capacity.
  if (itemWeights[itemWeightsLength - 1] <= knapsackCapacity) {
    // for every item, we can include the item or not.
    // Choice 1: if we include the item, its price will be taken into consideration, its weight has to removed from knapsack capacity and we need to apply the same function on other items.
    // Choice 2: we don't include the item at all. in that case we don't reduce the knapsack capacity. we won't consider its value for maximum profit. which is second function call in Math.max below.

    return Math.max(
      itemValues[itemWeightsLength - 1] +
        knapsack(
          itemWeights,
          itemValues,
          knapsackCapacity - itemWeights[itemWeightsLength - 1],
          itemWeightsLength - 1
        ),
      knapsack(itemWeights, itemValues, knapsackCapacity, itemWeightsLength - 1)
    );
  } else if (itemWeights[itemWeightsLength - 1] > knapsackCapacity) {
    //the given item has its weight greater than knapsack capacity. Thus, we need to ignore the item and apply function on other items.
    return knapsack(
      itemWeights,
      itemValues,
      knapsackCapacity,
      itemWeightsLength - 1
    );
  }
}

// knapsack(itemWeights, itemValues, knapsackCapacity, itemWeights.length);

// We can either memoize above recursive function or create a top-down matrix.
// In order to create memoized version we need to create a matrix. The matrix is made up of variables which are changing. The above recursive implementation will made for knapsackCapacity and itemWeightsLength dimensions. Whenever we call the "knapsack" function, we are passing itemWeightsLength && knapsackCapacity, so in order to get t[itemWeightsLength][knapsackCapacity] we will need to store values in the matrix of itemWeightsLength  + 1 and knapsackCapacity + 1 dimensions.
// here we created memoized matrix.
let t = new Array(itemWeightsLength + 1)
  .fill(0)
  .map(() => new Array(knapsackCapacity + 1).fill(-1));

function knapsack(
  itemWeights,
  itemValues,
  knapsackCapacity,
  itemWeightsLength
) {
  if (knapsackCapacity === 0 || itemWeightsLength === 0) return 0;
  if (t[itemWeightsLength][knapsackCapacity] !== -1)
    return t[itemWeightsLength][knapsackCapacity];
  if (itemWeights[itemWeightsLength - 1] <= knapsackCapacity) {
    return (t[itemWeightsLength][knapsackCapacity] = Math.max(
      itemValues[itemWeightsLength - 1] +
        knapsack(
          itemWeights,
          itemValues,
          knapsackCapacity - itemWeights[itemWeightsLength - 1],
          itemWeightsLength - 1
        ),
      knapsack(itemWeights, itemValues, knapsackCapacity, itemWeightsLength - 1)
    ));
  } else if (itemWeights[itemWeightsLength - 1] > knapsackCapacity) {
    return (t[itemWeightsLength][knapsackCapacity] = knapsack(
      itemWeights,
      itemValues,
      knapsackCapacity,
      itemWeightsLength - 1
    ));
  }
}

// In memozied version we are having matrix along with recursive calls

// Top-Down Matrix.
// In top-down matrix, we just have a matrix without any recursive calls. The top down matrix will be of dimensions itemWeightsLength + 1 and knapsackCapacity + 1. The matrix 't' can be created as follows:

//     0 1 2 3 4 5 6 7
// 0
// 1
// 2
// 3
// 4

// t[2][3] corresponds to first two items from 'itemWeights' (i.e itemWeights = [1,3], its values itemValues = [1,4] and knapsackCapacity = 3). Similarly, t[4][7] corresponds to first four items from 'itemWeights' (i.e itemWeights = [1,3, 4, 5], its values itemValues = [1,4, 5, 7] and knapsackCapacity = 7). Thus, finding value at t[4][7] will give us the result for the above question.

// The matrix's first row and first column has to be initialized.Sice the first row and first column are initialized, matrix row and column indexes do not match directly with itemWeights. t[1][1] corresponds to itemWeights = 1, t[2][3] corresponds to [1,3] and so on...
// The base condition in recursive function corresponds to matrix initialization. Thus matrix have to be initialized. Please note top-down matrix does not recursive function calls. top-down matrix is implemented iteratively.

// The following is used in recursive function. The same can be used to initialize first row and first column in top-down matrix.
// if (knapsackCapacity === 0 || itemWeightsLength === 0) return 0;

//     0 1 2 3 4 5 6 7
// 0   0 0 0 0 0 0 0 0
// 1   0
// 2   0
// 3   0
// 4   0

function knapsack(
  itemWeights,
  itemValues,
  knapsackCapacity,
  itemWeightsLength
) {
  for (let i = 0; i < itemWeights.length + 1; i++) {
    for (let j = 0; j < knapsackCapacity + 1; j++) {
      if (i === 0 || j === 0) {
        t[i][j] = 0;
      } else {
        if (itemWeights[i - 1] <= j) {
          t[i][j] = Math.max(
            itemValues[i - 1] + t[i - 1][j - itemWeights[i - 1]],
            t[i - 1][j]
          );
        } else if (itemWeights[i - 1] > j) {
          t[i][j] = t[i - 1][j];
        }
      }
    }
  }
  return t[itemWeightsLength][knapsackCapacity];
}

knapsack(itemWeights, itemValues, knapsackCapacity, itemWeights.length);

// given an array of integers and a number sum. find if a subset in the array is present whose sum is equal to number sum. Return true if subset is present otherwise false.
// knapsack can be identified by applying following logic.
// 1. If an array is given or two arrays are given. If an array is given consider that array to refer to itemWeights
// 2. If for each element of the array, we have a possibility of either choosing it or not.
// 3. Along with a number is given. That number is referred to knapsackCapacity.

let arr = [2, 3, 7, 8, 10];
let sum = 11;

function subsetSum(arr, sum) {
  let t = new Array(arr.length + 1).fill().map((_) => new Array(sum + 1));
  for (let i = 0; i < arr.length + 1; i++) {
    for (let j = 0; j < sum + 1; j++) {
      if (i === 0 || j === 0) {
        if (i === 0 && j === 0) {
          t[i][j] = true; //for sum = 0 and arr = [], there is a possibility to achieve an outcome
        } else if (i === 0 && j !== 0) {
          t[i][j] = false; //for any sum other than 0 and arr = [],there does not exists any possibility
        } else {
          t[i][j] = true;
        }
      } else {
        if (arr[i - 1] <= j) {
          //here when i = arr.length, we have two choices either to take it into consideration or not
          t[i][j] = t[i - 1][j - arr[i - 1]] || t[i - 1][j];
        } else {
          t[i][j] = t[i - 1][j];
        }
      }
    }
  }
  return t[arr.length][sum];
}

// subsetSum(arr, sum);

// given an array of integers, divide the array into two subarrays (doesn't have to of equal size). find if sum of all elements of each partition are equal or not (return true/false)
// For Ex: [1,5,11,5] there could be two partitions {1,5,5} and {11}. Sum of all elements of each partition are equal.
// One thing is for sure that if sum of all elements of the given array is even then only we can have partitions whose elements' sum will be equal. There do not exist a possibility of spliting odd-sum array into two partitions whose sum of elements will be equal.
// Thus, we need to find a partition (similar to previous question) whose sum of elements is equal to (sum of all elements of given array/2)
function equalSumPartition(arr, sum) {
  sum = arr.reduce((prev, curr) => prev + curr);
  if (sum % 2 !== 0) return false;
  else return subsetSum(arr, sum / 2); //if a partition's all elements sum is equal to sum/2, the other partition's all elements will be equal to sum/2
}

equalSumPartition([1, 5, 11, 5]);

// given an array and a targetSum, count number of subsets whose sum of elements is equal to a given sum.
// For Ex: arr = [2,3,5,6,8,10] targetSum = 10 => there can be three subsets [2,3,5], [10], [8, 2]
function countSubsets(arr, sum) {
  let t = new Array(arr.length + 1).fill().map((_) => new Array(sum + 1));
  for (let i = 0; i < arr.length + 1; i++) {
    for (let j = 0; j < sum + 1; j++) {
      if (i === 0 || j === 0) {
        if (i === 0 && j === 0) {
          t[i][j] = 1; //for sum = 0 and arr = [], there is a possibility to achieve an outcome
        } else if (i === 0 && j !== 0) {
          t[i][j] = 0; //for any sum other than 0 and arr = [],there does not exists any possibility
        } else {
          t[i][j] = 1;
        }
      } else {
        if (arr[i - 1] <= j) {
          //here when i = arr.length, we have two choices either to take it into consideration or not
          t[i][j] = t[i - 1][j - arr[i - 1]] + t[i - 1][j];
        } else {
          t[i][j] = t[i - 1][j];
        }
      }
    }
  }
  return t[arr.length][sum];
}

countSubsets([2, 3, 5, 6, 8, 10], 10);

// given an array find the minimum difference of sum of all elements of each partition.
// For Ex: [1,6,5,11]=> Partition-1 (P1) = [1,6,5] and P2 = [11] Sum of P1 elements = 12, Sum of P2 elements = 11, minimum diff = 12-11 = 1
