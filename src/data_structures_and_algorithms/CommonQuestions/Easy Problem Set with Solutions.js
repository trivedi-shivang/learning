// given an array, find if it is subsequence of another array
// O(N) | O(1)
function validateSubsequence(arr, sequence) {
  let arrIdx = 0;
  let seqIdx = 0;
  while (arrIdx < arr.length && seqIdx) {
    if (arr[arrIdx] === sequence[seqIdx]) {
      seqIdx++;
    }
    arrIdx++;
  }
  return seqIdx === sequence.length;
}

function validateSubsequence(arr, sequence) {
  let seqIdx = 0;
  for (let arrIdx = 0; arrIdx < arr.length; arrIdx++) {
    if (seqIdx === sequence.length) break;
    if (arr[arrIdx] === sequence(seqIdx)) {
      seqIdx++;
    }
  }
  return seqIdx === sequence.length;
}

// array of distinct integer values and a target, find a pair of two numbers whose sum is equal to target
// naive solution O(N^2) | O(1) (By having two for loops)
// hash table/object O(N) | O(N) (by using hash table)
// sort array first and then have two pointers: one on leftmost elem and one on rightmost elem O(NLogN) | O(1)
function twoNumberSum(arr, targetSum) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] + arr[j] === targetSum) {
        return [arr[i], arr[j]];
      }
    }
  }
  return [];
}

function twoNumberSum(arr, targetSum) {
  nums = {};
  for (let value of arr) {
    if (targetSum - value in nums) {
      return [value, targetSum - value];
    } else {
      nums[value] = true;
    }
  }
  return [];
}

// one interesting thing to note here is when left is not pointing to leftmost and right is not pointing to rightmost but and we are only concerned about unvisited numbers and not visited ones.
function twoNumberSum(arr, targetSum) {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] + arr[right] === targetSum) {
      return [arr[left], arr[right]];
    } else if (arr[left] + arr[right] > targetSum) {
      right--;
    } else {
      left++;
    }
  }
  return [];
}

// given an array of integer sorted in increasing order, the function will square those integers and return those values.
// naive approach: O(NLogN) | O(N)
// O(n) | O(N)
function sortedSquaredArray(arr) {
  let sortedSquares = Array(arr.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    sortedSquares[i] = arr[i] * arr[i];
  }
  sortedSquares.sort((a, b) => a - b);
  return sortedSquares;
}

function sortedSquaredArray(arr) {
  let sortedSquares = Array(arr.length).fill(0);
  let i = sortedSquares.length - 1;
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let absLeft = Math.abs(arr[left]);
    let absRight = Math.abs(arr[right]);
    if (absLeft > absRight) {
      sortedSquares[i] = absLeft * absLeft;
      left++;
    } else {
      sortedSquares[i] = absRight * absRight;
      right--;
    }
    i--;
  }
  return sortedSquares;
}

// tournament multiple teams compete each other. two teams in a competition one winner one looser. each team will compete with other team exactly once. there will exactly one tournament winner. given two arrays competitions and results. each element in results array will refer to corresponding sub-array in competitions. If element in results array is 0 then that means away team won and 1 means that home team won
// O(N) | O(k) where k is number of teams competing and N is length of results/competitions array
function tournamentWinner(competitions, results) {
  let scores = {};
  let winner = "";
  let wonTeam = null;
  for (let i = 0; i < results.length; i++) {
    let [homeTeam, awayTeam] = competitions[i];
    if (results[i] === 0) {
      // awayTeam won
      wonTeam = awayTeam;
    } else {
      wonTeam = homeTeam;
      if (wonTeam in scores) {
        scores[wonTeam] += 3;
      } else {
        scores[wonTeam] = 3;
      }
    }
    if (!(winner in scores) || scores[winner] < scores[wonTeam]) {
      winner = wonTeam;
    }
  }
  return wonTeam;
}

// given an array of integer which are referred to as cents and a targetnum, find out what is the smallest number which cannot be created by combining array elements.
// brute force approach: find all combinations of the array such that
// optimal solution: sort the array
function nonConstructibleChange(coins) {
  coins.sort((a, b) => a - b);
  let currentChangeCreated = 0;
  for (let i = 0; i < coins.length; i++) {
    if (coins[i] > currentChangeCreated + 1) break;
    else currentChangeCreated += coins[i];
  }
  return currentChangeCreated + 1;
}

//minimum waiting time. input containing positive integers containing atleast a value. each input array element represents duration of a query to be executed. minimum waiting time of a query is the time it has to wait before it starts executing. the first input element can execute immediately, second element has to wait before first gets executed, third element has to wait before first and second queries are executed. find out miniumum time of all queries. although order of queries is not required to be returned but finding that will help us to find the least amount all queries will take to execute.
// solution having queries which takes less time to execute to the starting of the array. this make help time-consuming queries placed at the end to wait the least to be able to execute themselves. This is called a greedy algorithm since at every index you are choosing which is the smallest element to choose from.
function minimumWaitingTime(queries) {
  queries.sort((a, b) => a - b);
  let totalWaitingTime = 0;
  for (let i = 0; i < queries.length; i++) {
    let queriesLeft = queries.length - (i + 1);
    totalWaitingTime += queriesLeft * queries[i];
  }
  return totalWaitingTime;
}

// given two input arrays: height of students wearing red-shirts and height of students wearing blue-shirts. both input will be of same length. both array will contain positive integers. all of the students wearing red-shirt should be in the same row and all of the blue-shirt students should be in the same row. there should be two rows. first row should be stricly shorter than students in the back row.
// sort both input arrays (since we don't which input has a student who has the least height)
// find the shortest student by comparing first element from both inputs
// red = [1,3,4,5,8]; blue = [2,4,5,6,9]
// red-shirt students should be in the front-row (since red-shirt student with highest height (8) is strictly shorter than the tallest height of the tallest blue-shirt student (9).
// greedy algorithm since at every step we are making greedy decision. we are looking for tallest student from both inputs and checking that the student in the first row is shorter thna student in the back row. If any student pair does not follow the guideline, we return false.
// O(NLogN) Sort both inputs | O(1) sorting inplace
function classPhotos(redShirtStudents, blueShirtStudents) {
  redShirtStudents.sort((a, b) => a - b);
  blueShirtStudents.sort((a, b) => a - b);
  let behindRow;
  if (
    redShirtStudents[redShirtStudents.length - 1] <
    blueShirtStudents[blueShirtStudents.length - 1]
  ) {
    behindRow = "blue";
  } else {
    behindRow = "red";
  }
  for (let i = 0; i < redShirtStudents.length; i++) {
    if (behindRow === "blue" && redShirtStudents[i] >= blueShirtStudents[i])
      return false;
    if (behindRow === "red" && blueShirtStudents[i] >= redShirtStudents[i])
      return false;
  }
  return true;
}

// given three inputs. First will an array which will be each red-shirt rider's speed. second will be an array which will be each blue-shirt rider's speed. And third input will be a "fastest" variable with boolean value(true/false). Speed of a pair of riders is determined by the fastest rider amongst the two. if "fastest" is true than find maximum total speed otherwise find minimum total  speed
// redShirtSpeeds = [5,5,3,9,2]
// blueShirtSpeeds = [3,6,7,2,1]
// fastest = true
// after sorting
// redShirtSpeeds = [2,3,5,5,9]
// blueShirtSpeeds = [1,2,3,6,7]
// minimum with minimum
// [[2,1], [3,2], [5,3], [5,6], [9,7]] = 25 (minimum total speed)
// or
// minimum with maximum [2,7], [3,6], [5,3], [5, 2], [9, 1] = 32 (maximum total speed)

// This is greedy algorithm. Greedy algorithm typically involves sorting input.
function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
  redShirtSpeeds.sort((a, b) => a - b);
  if (fastest) {
    blueShirtSpeeds.sort((a, b) => b - a); //reverse sorted
  } else {
    blueShirtSpeeds.sort((a, b) => a - b);
  }
  let total = 0;
  for (let i = 0; i < redShirtSpeeds.length; i++) {
    total += Math.max(redShirtSpeeds[i], blueShirtSpeeds[i]);
  }
  return total;
}

// given an integer n, find nth fibonacci sequence
// for every function call, we are making two function calls. Those get multiplied rougly n times (roughly because of base cases won't call function). Thus O(2^N)
function getNthFib(n) {
  if (n === 2) return 1;
  else if (n === 1) return 0;
  else return getNthFib(n - 2) + getNthFib(n - 1);
}

// with memoize
// it will calculate once for every n value. once calculated, it will cache that value and refer it later. Thus, O(N) (for finding n fibonacci values) | O(N)
let memoize = {
  1: 0,
  2: 1,
};
function getNthFib(n) {
  if (!(n in memoize)) {
    memoize[n] = getNthFib(n - 1) + getNthFib(n - 2);
  }
  return memoize[n];
}

// O(N) | O(1)
function getNthFib(n) {
  let fibs = [0, 1];
  if (n === 2) return fibs[1];
  else if (n === 1) return fibs[0];
  else {
    for (let i = 3; i <= n; i++) {
      let temp = fibs[1];
      fibs[1] = fibs[0] + fibs[1];
      fibs[0] = temp;
    }
    return fibs[1];
  }
}

// given an array of integers or arrays, find product-sum. A product sum of an array is sum of all elements multiplied by the depth of the array. The given input array has depth of 1. If any children of the input array is an array their depth will be 2 and so on...
// O(N) all elements of the all sub-arrays (if any) or all elements of arr | O(d) depth of deepest sub-array in the arr
function productSum(arr, depth = 1) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      sum += productSum(arr[i], depth + 1); //not replacing depth variable, instead passing modified variable. This is because depth variable to calculate product-sum on current-depth
    } else {
      sum += arr[i];
    }
  }
  return sum * depth;
}

// given an sorted array of integers and a target-number, using binary-search find if an element exist in the array which matches the targetnum. If not return -1
// binary-search is only applied to sorted list of things
// O(log n) | O(log n)
function binarySearch(arr, target) {
  return binarySearchHelper(arr, target, 0, arr.length - 1);
}

function binarySearchHelper(arr, target, left, right) {
  if (left > right) return -1;
  else {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return target;
    else if (arr[middle] > target) {
      return binarySearchHelper(arr, target, left, middle - 1);
    } else {
      return binarySearchHelper(arr, target, middle + 1, right);
    }
  }
}

// O(logn) | O(1)
function binarySearch(arr, target) {
  let left = arr[0];
  let right = arr[arr.length - 1];
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) return target;
    else if (arr[middle] > target) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}

binarySearch([1, 2, 3, 4, 5], 2);

// find an array of integers, find three largest numbers in the array and return that sub-array in asc order.
function threeLargestNumbers(arr) {
  let threeLargest = Array(3).fill(null);
  for (let num of arr) {
    updateLargest(threeLargest, num);
  }
  return threeLargest;
}

function updateLargest(threeLargest, num) {
  if (!threeLargest[2] || threeLargest[2] < num) {
    shiftAndUpdate(threeLargest, num, 2);
  } else if (!threeLargest[1] || threeLargest[1] < num) {
    shiftAndUpdate(threeLargest, num, 1);
  } else if (!threeLargest[0] || threeLargest[0] < num) {
    shiftAndUpdate(threeLargest, num, 0);
  }
}

function shiftAndUpdate(arr, num, idx) {
  let i = 0;
  while (i <= idx) {
    if (i === idx) {
      arr[i] = num;
    } else {
      arr[i] = arr[i + 1];
    }
    i++;
  }
}

threeLargestNumbers([1, 2, 3, 4]);

// given an array of integers, sort it using bubble-sort
function bubbleSort(arr) {
  while (true) {
    let isSorted = false;
    let j = 0;
    let counter = 0;
    while (j < arr.length - 1 - counter) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isSorted = true;
      }
      j++;
    }
    counter++;
    if (!isSorted) return arr;
  }
}

bubbleSort([5, 4, 3, 2, 1]);

// given an array of integers, sort it using insertion-sort
// O(N^2) | O(1)
function insertionSort(arr) {
  // assuming first element to be part of sorted array, iterating through other elements and placing them correctly in the sorted array
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let isSorted = true;
    while (arr[j] < arr[j - 1] && j > 0) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      isSorted = false;
      j--;
    }
    if (!isSorted) return arr;
  }
}

insertionSort([5, 4, 3, 2, 1]);

// given an array of integers, sort it using selection-sort
// O(N^2) | O(1)
function selectionSort(arr) {
  let currentIdx = 0;
  while (currentIdx < arr.length - 1) {
    smallestIdx = currentIdx;
    for (let i = currentIdx + 1; i < arr.length; i++) {
      if (arr[smallestIdx] > arr[i]) {
        smallestIdx = i;
      }
    }
    [arr[currentIdx], arr[smallestIdx]] = [arr[smallestIdx], arr[currentIdx]];
    currentIdx++;
  }
  return arr;
}

selectionSort([5, 4, 3, 2, 1]);

// given a string of a characters, write a function to determine if a string is a palindrome
// O(N) | O(N) creating new string
function isPalindrome(str) {
  let newStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return str === newStr;
}

// O(N) | O(N)
function isPalindrome(str) {
  let arr = [];
  for (let i = str.length - 1; i >= 0; i--) {
    arr.push(str[i]);
  }
  return str === arr.join("");
}

// O(n) | O(n)
function isPalindrome(str) {
  if (str.length === 1) return true;
  else
    return (
      str[0] === str[str.length - 1] &&
      isPalindrome(str.slice(1, str.length - 1))
    );
}

// O(N) | O(1)
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else return false;
  }
  return true;
}

isPalindrome("abcdcba");

function caesarCipherEncryptor(str, key) {
  let newLetters = [];
  newKey = key % 26;
  for (let letter of str) {
    newLetters.push(getNewLetter(letter, newKey));
  }
  return newLetters.join("");
}

function getNewLetter(letter, key) {
  let newLetterCode = letter.charCodeAt(0) + key; //fetches UTF-16 code-value of the letter
  return newLetterCode <= 122
    ? String.fromCharCode(newLetterCode)
    : String.fromCharCode(96 + (newLetterCode % 122)); //fromCharCode finds letter corresponding to "newLetterCode" UTF-16 code-value
}

let alphabets = ["abcdefghijklmnopqrstuvwxyz"];
function caesarCipherEncryptor(str, key) {
  let newLetters = [];
  newKey = key % 26;
  for (let char of str) {
    newLetters.push(getNewLetter(char, newKey));
  }
  return newLetters.join("");
}

function getNewLetter(letter, key) {
  newCode = alphabets[0].indexOf(letter) + key;
  return newCode <= 25
    ? alphabets[0][newCode]
    : alphabets[0][-1 + (newCode % 25)];
}

caesarCipherEncryptor("xyz", 2);

// given a string, encode all characters such that it has lossless compression. The string could have any type of characters like numbers, characters, special characters. Thus, encoded string can not frequency of each letter more than 9 because if there are characters of freq more than 9 than it would be difficult to figure out from the output what the input is.
// O(N) | O(N)
function runLineEncoding(string) {
  let encodedStringCharacters = [];
  let currentRunLength = 1;
  for (let i = 1; i < string.length; i++) {
    if (string[i] === string[i - 1] && currentRunLength !== 9) {
      currentRunLength += 1;
    } else {
      encodedStringCharacters.push(currentRunLength, string[i - 1]);
      currentRunLength = 1;
    }
  }
  encodedStringCharacters.push(currentRunLength, string[string.length - 1]);
  return encodedStringCharacters.join("");
}

// given two strings: "characters" and "document", check if letters in the "document" can be created by utilizing letter from "characters". If "characters" have letters more than required to form "document" then that is fine. But, it should not have less characters.
// O(N * (N + M)) | O(1)
function generateDocument(characters, document) {
  for (let char of characters) {
    documentFreq = countCharFreq(document, char);
    charactersFreq = countCharFreq(characters, char);
    if (documentFreq > charactersFreq) return false;
  }
  return true;
}

function countCharFreq(characters, char) {
  let count = 0;
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] === char) count++;
  }
  return count;
}

// O(c * (n + m)) | O(c) where c is unique characters in "document"
function generateDocument(characters, document) {
  let counted = {};
  for (let char of document) {
    if (!(char in counted)) {
      documentFreq = countCharFreq(document, char);
      charactersFreq = countCharFreq(characters, char);
      if (documentFreq > charactersFreq) return false;
      counted[char] = true;
    }
  }
  return true;
}

function countCharFreq(characters, char) {
  let count = 0;
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] === char) count++;
  }
  return count;
}

// O(n +m) | O(c) where c is unique letters in "characters"
function generateDocument(characters, document) {
  let charsFreq = {};
  for (let char of characters) {
    if (char in charsFreq) {
      charsFreq[char] += 1;
    } else {
      charsFreq[char] = 1;
    }
  }

  for (let char of document) {
    if (char in charsFreq) {
      charsFreq[char] -= 1;
    }
    if (charsFreq[char] === -1 || !(char in charsFreq)) return false;
  }
  return true;
}

// given an array of distinct integer values and a separate integer called "targetSum". Find all possible triplets that sum up to targetSum.
// naive solution would be to use 3 for-loops.
//another possible solution is to use JS object and run two for loops...
// sort the array first, then take one element as a reference and iterate rest of the elements to find triplets.
// O(N^2) (for every element, we are iterating other elements) | O(N) to store triplets
function threeNumberSum(array, targetSum) {
  array.sort((a, b) => a - b);
  let triplets = [];
  for (let i = 0; i < array.length - 2; i++) {
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      let currentSum = array[i] + array[left] + array[right];
      if (currentSum === targetSum) {
        triplets.push(array[i], array[left], array[right]);
        // only incrementing left or decrementing right will increase or decrease difference between "currentSum" and "targetSum" more or less respectively
        left++;
        right--;
      } else if (currentSum < targetSum) {
        left++;
      } else {
        right--;
      }
    }
  }
  return triplets;
}

// given two arrays of integer value, find pair of numbers (one number from each array) to have smallest pair difference (closest element from both arrays)
// naive solution is to use two for loops
// sort both arrays
// O(NlogN) + O(MlogM) | O(1)
function smallestDifference(arrayOne, arrayTwo) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let idxOne = 0;
  let idxTwo = 0;
  let smallest = Infinity;
  let current = Infinity;
  let smallestPair = [];
  while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
    let firstNum = arrayOne[idxOne];
    let secondNum = arrayTwo[idxTwo];
    if (firstNum < secondNum) {
      current = secondNum - firstNum;
      idxOne++;
    } else if (secondNum < firstNum) {
      current = firstNum - secondNum;
      idxTwo++;
    } else {
      return [firstNum, secondNum];
    }
    if (current < smallest) {
      smallest = current;
      smallestPair = [firstNum, secondNum];
    }
  }
  return smallestPair;
}

// given an array and a number .find all instances of that number in the array to the end of the array. you need to perform manipulations in place. Order of result array does not matter.
// can sort the array that will have O(NLogN) Time complexity.
// better solution would be two use two pointers
function moveElementToEnd(array, toMove) {
  let i = 0;
  let j = array.length - 1;
  while (i < j) {
    while (i < j && array[j] === toMove) {
      j--;
    }
    if (array[i] === toMove) {
      [array[i], array[j]] = [array[j], array[i]];
    }
    i++;
  }
  return array;
}

// given an array, find if it is monotonic or not. A monotoic array should either be non-increasing or non-decreasing.
// O(N) | O(1)
function isMonotonic(array) {
  if (array.length < 2) return true;
  let direction = array[1] - array[0];
  for (let i = 2; i < array.length; i++) {
    if (direction === 0) {
      direction = array[i] - array[i - 1];
      continue;
    }
    if (breaksDirection(direction, array[i - 1], array[i])) {
      return false;
    }
  }
  return true;
}

function breaksDirection(direction, previousInt, currentInt) {
  let difference = currentInt - previousInt;
  if (direction > 0 && difference < 0) return false;
  if (direction < 0 && difference > 0) return false;
  return true;
}

// O(N) | O(1)
function isMonotonic(array) {
  isNonDecreasing = true;
  isNonIncreasing = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      isNonDecreasing = false;
    } else if (array[i] > array[i - 1]) {
      isNonIncreasing = false;
    }
    if (!isNonDecreasing && !isNonIncreasing) return false;
  }
  return true;
}

// given a 2-D array (of rectangle or square shape), spiral-traverse it and print array elements
// O(N) | O(N) (for "results" array)
function spiralTraverse(array) {
  let result = [];
  let startRow = 0;
  let endRow = array.length - 1;
  let startCol = 0;
  let endCol = array[0].length - 1;
  while (startRow <= endRow && startCol <= endCol) {
    // '=' is used when odd-dimensional array is traversed
    for (let col = startCol; col <= endCol; col++) {
      result.push(array[startRow][col]);
    }
    for (let row = startRow + 1; row <= endRow; row++) {
      result.push(array[row][endCol]);
    }

    for (let col = endCol - 1; col >= startCol; col--) {
      result.push(array[endRow][col]);
    }

    for (let row = endRow - 1; row >= startRow + 1; row--) {
      result.push(array[row][startCol]);
    }

    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }
  return result;
}

// O(N) | O(N) (for "results" array)
function spiralTraverse(array) {
  let result = [];
  spiralFill(array, 0, array.length - 1, 0, array[0].length - 1, result);
  return result;
}

function spiralFill(array, startRow, endRow, startCol, endCol, result) {
  if (startRow > endRow || startCol > endCol) return;
  for (let col = startCol; col <= endCol; col++) {
    result.push(array[startRow][col]);
  }
  for (let row = startRow + 1; row <= endRow; row++) {
    result.push(array[row][endCol]);
  }

  for (let col = endCol - 1; col >= startCol; col--) {
    result.push(array[endRow][col]);
  }

  for (let row = endRow - 1; row >= startRow + 1; row--) {
    result.push(array[row][startCol]);
  }
  spiralFill(array, ++startRow, --endRow, ++startCol, --endCol, result);
}

// given an array of integers, find the number of integers in the longest peak. A peak is strictly increasing, has a peak and elements after the peak are strictly decreasing.
// Peak has to be comprise of atleast 3 elements
// O(N) (while loop will iterate for all elements in a case when the array does not have a peak at all. the inner while loop common elements between two peaks twice or thrice. Hence O(2N) or O(3N)) | O(1) (just storing longestPeakLength, currentPeakLength, i, leftIdx, rightIdx)
function longestPeak(array) {
  let longestPeakLength = 0;
  let i = 1; //as a peak has to be of atleast 3 elements, it cannot start from 0
  while (i < array.length - 1) {
    let isPeak = array[i - 1] < array[i] && array[i] > array[i + 1];
    if (!isPeak) {
      i += 1;
      continue;
    }
    leftIdx = i - 2; //not i-1 because that is already part of the peak as confirmed in "isPeak"
    while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
      leftIdx--;
    }
    while (
      rightIdx <= array.length - 1 &&
      array[rightIdx] < array[rightIdx - 1]
    ) {
      rightIdx++;
    }
    rightIdx = i + 2;
    currentPeakLength = rightIdx - leftIdx - 1;
    longestPeakLength = Math.max(longestPeakLength, currentPeakLength);
    i = rightIdx;
  }
  return longestPeakLength;
}

// given an array of integers, find array of products. An array of products consist of elements in which each element is product of all elements of the given array except the element at the corresponding index. For Ex:
// given [5,1,4,2] => [8, 40, 10, 20] => first element = 1 * 4 *2, second element = 5 * 4 *2 and so on...
// one of the ways is to loop twice: first loop will calculate product of all elements (that will be 40 in this case) while the second loop will perform division operation on each element 40/5, 40/1, 40/4 and 40/2. This will give O(N) space and time complexity.
// another approach is to use nested for-loops to calculate array of products. That will be O(N^2) Time and O(N) space (to store final results)
// optimal approach without division operation is to have multiple linear traversal. The first traversal will calculate "left running product" (product of all elements on the left of the current element) and then second traversal will calculate "right running product" and the third traversal will multiple elements at corresponding index in third result array.

// O(N^2) | O(N)
function arrayOfProducts(array) {
  let products = Array(array.length).fill(1);

  for (let i = 0; i < array.length; i++) {
    let runningProduct = 1;
    for (let j = 0; j < array.length; j++) {
      if (i != j) {
        runningProduct *= array[j];
      }
    }
    products[i] = runningProduct;
  }
  return products;
}

// O(N) | O(N) (actually O(3N) for three traversal but it is equal to O(N))
function arrayOfProducts(array) {
  let products = Array(array.length).fill(1);
  let leftProducts = Array(array.length).fill(1);
  let rightProducts = Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    leftProducts[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    rightProducts[i] = rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  for (let i = 0; i < array.length; i++) {
    products[i] = leftProducts[i] * rightProducts[i];
  }
  return products;
}

// O(N) | O(N)
function arrayOfProducts(array) {
  let products = Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    products[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    products[i] *= rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  return products;
}

// given an array of integers in which every element has a value following the condition 1<=arr[i]<=N where N is the size of the array. Return the first duplicate value.
// An array may not have any duplicates at all in the case return -1.
// The array might have multiple duplicates in that case we need to find the array element whose duplicate before any other duplicate elements.

// naive approach: for every element in the array run a for-loop to iterate over rest of the elements to find if any inner-for-loop-element matches with outer-for-loop-element. if found update minimumSecondIndex variable with that outer-loop-element's index.
// O(N^2) | O(1)
function firstDuplicateValue(array) {
  let minimumSecondIndex = array.length;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        minimumSecondIndex = Math.min(minimumSecondIndex, j);
      }
    }
  }
  return minimumSecondIndex === array.length ? -1 : array[minimumSecondIndex];
}

// O(N) | O(N)
function firstDuplicateValue(array) {
  let seen = new Set();
  for (let value of array) {
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
  }
  return -1;
}

// o(N) | O(1)
function firstDuplicateValue(array) {
  for (let value of array) {
    if (array[Math.abs(value) - 1] < 0) {
      return Math.abs(value);
    }
    array[Math.abs(value) - 1] *= -1;
  }
  return -1;
}

// given an array of arrays. Each arrays are called intervals. Each interval/array has two elements: first element is the start of the interval and second element is the end of the interval. return results array which merges overlapping intervals. Two intervals overlap when ending interval of one of the intervals is greater than equal to starting interval of another interval.

// O(nlogN) sorting array | O(N) storing output.
function mergeOverlappingIntervals(intervals) {
  // Sort intervals by starting value
  intervals.sort((a, b) => a[0] - b[0]);
  let mergedIntervals = [];
  let currentInterval = intervals[0]; //stack's topmost value
  mergedIntervals.push(currentInterval);
  for (let nextInterval of intervals) {
    let [_, currentIntervalEnd] = currentInterval;
    let [nextIntervalStart, nextIntervalEnd] = nextInterval;
    console.log(currentInterval, nextInterval);
    if (currentIntervalEnd >= nextIntervalStart) {
      // if intervals overlap, find maximum intervalEnd from both intervals
      currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
      console.log("intervals overlap" + mergedIntervals);
    } else {
      console.log(
        `currentIntervalEnd ${currentIntervalEnd} is not >= nextIntervalStart ${nextIntervalStart}`
      );
      currentInterval = nextInterval;
      mergedIntervals.push(currentInterval);
      console.log(`mergedIntervals  ${mergedIntervals}`);
    }
  }
  return mergedIntervals;
}

// let depthFirstNodes = [];
// bst.depthFirstSearch(depthFirstNodes)
// console.log(depthFirstNodes);

// console.log(smallestDifference([-1,5,10,20,28,3], [26, 134, 135, 15, 17]));
// console.log(moveElementToEnd([2,2,2,2,2,1,4,2,3], 2));
// console.log(isMonotonic([1,2,3,43,2,1]));
// console.log(spiralTraverse([[1,2,3,4], [5,6,7,8], [9,10,11,12], [13, 14, 15, 16]]));
// console.log(longestPeak());
// console.log(arrayOfProducts([5,1,4,2]));
// console.log(firstDuplicateValue([5,4,1,2,5,2,4,2]));
// console.log(mergeOverlappingIntervals([[1,2], [3, 4], [4, 6], [4, 8], [10, 15], [12, 14]]));
