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
let t;

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
t = new Array(itemWeightsLength + 1)
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
  t = new Array(arr.length + 1).fill().map((_) => new Array(sum + 1));
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
  t = new Array(arr.length + 1).fill().map((_) => new Array(sum + 1));
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
// For Ex: [1,6,5,11]=> Partition-1 (P1) = [1,6,5] and P2 = [11] S1(Sum of P1 elements) = 12, S2(Sum of P2 elements) = 11, minimum diff = 12-11 = 1
// we don't know what S1 and S2 but we do know that both cannot be less than 0 (when a partition does not have any element) and cannot be greater than sum of all elements (23) = [1,5,6,11]
// apart from this problem what if we want to find partitions whose sum of elements is maximum. In that case we can have P1 = {} and P2 = {1,6,5, 11} This is guaranteed to be maximum difference
// now we know that s1-s2 or s2-s1 has to be minimum. leet's assume s2-s1 is +ve. That means s1<s2. we know Range = s1+s2. Therefore s2-s1 has to be minimum. That is range-s1-s1 is minimum. that is range-2s1 has to be minimum. range is constant. Thus, in order to make range-2s1 minimum, we need to minimize s1. We also know that s1 cannot be greater than (range/2) (because if that is than s2-s1 won't be positive). Also we know that s1 and s2 cannot be all values betwee minimum sum (0 empty partition) and maximum sum (23).For Ex: there cannot be any partition whose sum of elements is 2,3,4,8,9....etc.

function minimumPartitionDifference(arr) {
  let range = arr.reduce((prev, curr) => prev + curr);
  subsetSum(arr, range);
  // since we need to minimize s1 and s1 cannot be greater than range/2 and we are only concerned with last row in t variable (since last row represents all elements whose sum is between 0 and range)

  let possibleSubsetSums = [];
  for (let i = 0; i < t[arr.length].length; i++) {
    if (i <= range / 2 && t[arr.length][i]) {
      possibleSubsetSums.push(i);
    }
  }
  let minimumPartitionSum = Infinity;
  for (let i = 0; i < possibleSubsetSums.length; i++) {
    minimumPartitionSum = Math.min(
      minimumPartitionSum,
      range - 2 * possibleSubsetSums[i]
    );
  }
  return minimumPartitionSum;
}

// given an array. divide into two subarrays. Also given difference of sum of elements of both subarrays. Count the number of subsets.
// for ex: arr = [1,1,2,3] diff = 1
// we are given S1-S2. we can find s1+s2 (sum of all elements of the given array). Thus, s1 = (range+diff) /2 . when we know s1, we can find count of subsets whose sum = 1
function countSubsetSumsDiff(arr, diff) {
  let range = arr.reduce((prev, curr) => prev + curr);
  let s1 = (range + diff) / 2;
  return countSubsets(arr, s1);
}

// given an array, you can assign either + or - sign before each element in the array. you have to assign a sign ahead of each element . count number of subsets whose sum is equal to target sum
// for ex: arr = [1,1,2,3], targetSum= 1
// we can have [1, 2] and [1,3] if we sum elements in each array we would get subset sum difference will be 1.
// we can have [1,1,2] and [3] subset sum diff would be 1 as well.
// this is basically the above question where we are given diff.
function countSubsetSumsDiffEqualTargetSum(arr, targetSum) {
  countSubsetSumsDiff(arr, targetSum);
}

//Unbounded Knapsack: What is that?
// It is similar to 0-1 knapsack remember the following code in subsetSums function?
// t[i][j] = Math.max(
//   itemValues[i - 1] + t[i - 1][j - itemWeights[i - 1]],
//   t[i - 1][j]
// );
// it has to be converted to
// t[i][j] = Math.max(
//   itemValues[i - 1] + t[i][j - itemWeights[i - 1]],
//   t[i - 1][j]
// );
// why? because every selected element can be selected again and again and again....as many times as you want (instead of t[i-1][j-itemWeights[i-1]] where after including the item, you run the same function on elements other than the included element and you don' include that included element again)

// Rod cutting problem:
// Given a rod. You can cut as many times as you want. you are also given a price array which corresponds to each cut size.
// For ex: lengths = [1,2,3,4,5,6,7,8] lengthWisePrices = [1,5,8,9,10,17,17,20]. We need to make cuts of the rod to maximize profit.
// let's say only lengthWisePrices is given and not lengths is given then lengthWisePrices can be constructed as follows

function maximizeRodLengthPrices(lengths, lengthWisePrices, N) {
  t = new Array(N + 1).fill().map((_) => new Array(lengths.length + 1));
  for (let i = 0; i < N + 1; i++) {
    for (let j = 0; j < lengths.length + 1; j++) {
      if (i === 0 || j === 0) {
        // j=0 means lengths is given but N=0 that means there is profit. similarly N is given but corresponding lengths is not given then there will be no profit
        t[i][j] = 0;
      } else {
        if (lengths[i - 1] <= j) {
          t[i][j] = Math.max(
            lengthWisePrices[i - 1] + t[i][j - lengths[i - 1]],
            t[i - 1][j]
          );
        } else if (lengths[i - 1] > j) {
          t[i][j] = t[i - 1][j];
        }
      }
    }
  }
  return t[N][lengths.length];
}

maximizeRodLengthPrices(
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 5, 8, 9, 10, 17, 17, 20],
  8
);

// given an array of coins = [1,2,3] and a target Sum = 5.return number of ways you can use given coins whose sum is equal to targetSum. It is knapsack because for every coin there is a choice whether to include it or not. it is unbounded because each coin can be included multiple times.
function coinChange(arr, targetSum) {
  t = new Array(arr.length + 1).fill().map((_) => new Array(targetSum + 1));
  for (let i = 0; i < arr.length + 1; i++) {
    for (let j = 0; j < targetSum + 1; j++) {
      if (i === 0 || j === 0) {
        if (i === 0 && j === 0) {
          // coins = [] and targetSum = 0 there exist a way
          t[i][j] = 1;
        } else if (i === 0 && j !== 0) {
          // coins = [] and targetSum is anything but 0 thus no way
          t[i][j] = 0;
        } else {
          // i!=0 but j=0 coins could be anything but targetSum = 0
          t[i][j] = 1;
        }
      } else {
        if (arr[i - 1] <= j) {
          t[i][j] = t[i - 1][j] + t[i][j - arr[i - 1]]; //here number of ways is asked hence we are removing Math.max and adding '+' sign
        } else {
          t[i][j] = t[i - 1][j];
        }
      }
    }
  }
  return t[arr.length][targetSum];
}

coinChange([1, 2, 3], 5);

// given an array of coins and a targetSum = 5, find how many minimum number of coins are required to whose sum is equal to targetSum
function minimumNumberOfCoins(coins, targetSum) {
  t = new Array(coins.length + 1).fill().map((_) => new Array(targetSum + 1));
  for (let i = 0; i < coins.length + 1; i++) {
    for (let j = 0; j < targetSum + 1; j++) {
      if (i === 0 || j === 0) {
        if (i === 0) {
          t[i][j] = Infinity; //coins = [] and targetSum is anything from 0 to 100. Let's say targetSum = 50. Minimum number of coins required to make targetSum = 50 is to pick infinite times to make 50. Here minimum number of coins is given that is why it is infinite. If it is number of ways to make 50 (like implementation above) there 0 coins
        }
        if (i !== 0 && j === 0) {
          t[i][j] = 0;
        }
      } else if (i === 1 && j !== 0) {
        t[i][j] = j % coins[0] === 0 ? j / coins[i] : Infinity - 1; //why because we assume coins array is sorted and i===1 represents we have only coins of that type. using that coin, how many picks can we do to make targetsum
      } else {
        if (coins[i - 1] <= j) {
          t[i][j] = Math.min(1 + t[i][j - coins[i - 1]], t[i - 1][j]); //why 1+?? because when we added that type of coin we are considering it as 1 more possible way to make targetSum
        } else {
          t[i][j] = t[i - 1][j];
        }
      }
    }
  }
  return t[coins.length][targetSum];
}

minimumNumberOfCoins([1, 2, 3], 5);

// Longest Common Subsequence
// Given two strings: S1= [a,b,c,d,g,h], S2 = [a,b,e,d,f,h,r]. Find longest common subsequence(not substring). subsequence, unlike substring, does not need to pick all array elements seuqentially.
function longestCommonSubsequenceLength(str1, str2) {
  if (str1.length === 0 || str2.length === 0) {
    //base condition
    return 0;
  }
  if (str1[str1.length - 1] === str2[str2.length - 1]) {
    // if last characters for both strings are equal, then run the same function on both strings after removing last characters.
    return (
      1 +
      longestCommonSubsequenceLength(
        str1.slice(0, str1.length - 1),
        str2.slice(0, str2.length - 1)
      )
    ); //why 1+? because we know last character is common in both strings.
  }
  return Math.max(
    longestCommonSubsequenceLength(str1, str2.slice(0, str2.length - 1)),
    longestCommonSubsequenceLength(str1.slice(0, str1.length - 1), str2)
  );
}

function longestCommonSubsequenceLength(str1, str2) {
  t = new Array(str1.length + 1)
    .fill()
    .map((_) => new Array(str2.length + 1).fill(-1));
  return longestCommonSubsequenceHelper(str1, str2);
}

function longestCommonSubsequenceHelper(str1, str2) {
  if (str1.length === 0 || str2.length === 0) {
    return 0;
  }
  if (t[str1.length][str2.length] !== -1) {
    return t[str1.length][str2.length];
  } else {
    if (str1[str1.length - 1] === str2[str2.length - 1]) {
      return (t[str1.length][str2.length] =
        1 +
        longestCommonSubsequenceHelper(
          str1.slice(0, str1.length - 1),
          str2.slice(0, str2.length - 1)
        ));
    } else {
      return (t[str1.length][str2.length] = Math.max(
        longestCommonSubsequenceHelper(str1, str2.slice(0, str2.length - 1)),
        longestCommonSubsequenceHelper(str1.slice(0, str1.length - 1), str2)
      ));
    }
  }
}

function longestCommonSubsequenceLength(str1, str2) {
  t = new Array(str1.length + 1)
    .fill()
    .map((_) => new Array(str2.length + 1).fill(-1));
  // console.table(t);
  for (let i = 0; i < str1.length + 1; i++) {
    for (let j = 0; j < str2.length + 1; j++) {
      if (i === 0 || j === 0) {
        t[i][j] = 0;
      } else {
        if (str1[i - 1] === str2[j - 1]) {
          t[i][j] = 1 + t[i - 1][j - 1];
        } else {
          t[i][j] = Math.max(t[i - 1][j], t[i][j - 1]);
        }
      }
    }
  }
  return t[str1.length][str2.length];
}

longestCommonSubsequenceLength("abcde", "abc");

// given two strings: S1 and S2, find longest common substring's length
function longestCommonSubstringLength(str1, str2) {
  t = new Array(str1.length + 1)
    .fill()
    .map((_) => new Array(str2.length + 1).fill(-1));
  let maxSubstringLength = 0;
  for (let i = 0; i < str1.length + 1; i++) {
    for (let j = 0; j < str2.length + 1; j++) {
      if (i === 0 || j === 0) {
        t[i][j] = 0;
      } else {
        if (str1[i - 1] === str2[j - 1]) {
          //why i-1? because i can go upto str1.length (which means at some point it will fetch str1[str1.length] which is undefined)
          t[i][j] = 1 + t[i - 1][j - 1];
        } else {
          t[i][j] = 0; //any time characters from both strings don't match, reset common substring count.
        }
      }
      maxSubstringLength = Math.max(maxSubstringLength, t[i][j]);
    }
  }
  return maxSubstringLength;
}

longestCommonSubstringLength("abcde", "abc");

function longestCommonSubsequence(str1, str2) {
  t = new Array(str1.length + 1)
    .fill()
    .map((_) => new Array(str2.length + 1).fill(0));
  for (let i = 0; i < str1.length + 1; i++) {
    for (let j = 0; j < str2.length + 1; j++) {
      if (i === 0 || j === 0) {
        t[i][j] = 0;
      } else {
        if (str1[i - 1] === str2[j - 1]) {
          t[i][j] = 1 + t[i - 1][j - 1];
        } else {
          t[i][j] = Math.max(t[i - 1][j], t[i][j - 1]);
        }
      }
    }
  }
  console.table(t);
  let i = str1.length;
  let j = str2.length;
  let commonSubsequence = "";
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      commonSubsequence += str1[i - 1];
      i--;
      j--;
    } else {
      if (t[i][j - 1] > t[i - 1][j]) {
        j--;
      } else {
        i--;
      }
    }
  }
  return commonSubsequence.split("").reverse().join("");
}

longestCommonSubsequence("abcd", "abc");

//given two strings, find shortest common supersequence. A supersequence is a string which consist of all characters of both strings sequentially (not necessarily in continuos fashion)
function shortestSupersequenceLength(str1, str2) {
  return str1.length + str2.length - longestCommonSubsequenceLength(str1, str2); //why longestCommon....() because the function will fetch length of subsequence. Subtracting that length from length of both strings will keep common characters from both strings once in the final supersequencelength
}

shortestSupersequenceLength("ABC", "A");

// minimum number of insertion or deletion to convert a string A from string B.
// if two arrays and a capacity or if an array and a capacity is given then it is 0/1 or unbounded knapsack problem

// if two strings are given, and if question is asked about LCS and if the output is asked in the form of string.
function numberOfOperations(str1, str2) {
  // longest common subsequence (LCS) is common between str1 and str2. They are not removed from any string (str1 or str2) to convert to other string (str2 or str1 respectively). Thus, two steps are happening. First str1 is converted to LCS by deleting characters and then LCS is converted to str2 by adding characters.
  let toLCSOperations =
    str1.length - longestCommonSubsequenceLength(str1, str2);
  let toStr2Operations =
    str2.length - longestCommonSubsequenceLength(str1, str2);
  return toLCSOperations + toStr2Operations;
}

// longest palindromic subsequence
// Given a string, return longest palindromic subsequence
function longestPalindromicSubsequenceLength(str1) {
  // since two strings are not given, LCS can be applied by reversing the given string and considering that reversed string as str2. If we find length of LCS of str1 and str2, that will be longest palindromic subsequence length
  let str2 = str1.split("").reverse().join("");
  return longestCommonSubsequenceLength(str1, str2);
}

// minimum number of deletion in a string to make it a palindrome
function minimumDeletionsToConvertStringToPalindrome(str1) {
  return str1.length - longestPalindromicSubsequenceLength(str1);
}

// if question is asking about optimal output (minimum, maximum, longest, shortest, maximize) or if there are choices or decisions to be made then dynamic programming (DP) will be applied
