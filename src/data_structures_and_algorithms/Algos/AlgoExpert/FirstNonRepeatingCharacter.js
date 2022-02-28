// string input with only lowercase characters
// from the input find the first non-repeating character. This means that from left to right, We need to find first character in the string which does not repeat itself in the entire string.

// brute-force approach
// O(n^2) | O(1)
function firstNonRepeatingCharacter(str) {
  for (let i = 0; i < str.length; i++) {
    let foundDuplicate = false;
    for (let j = 0; j < str.length; j++) {
      if (i !== j && str[i] === str[j]) {
        foundDuplicate = true;
      }
    }
    if (!foundDuplicate) return i;
  }
  return -1;
}

firstNonRepeatingCharacter("abca");

// using object
// O(n) | O(n)
let charsFreq = {};
function firstNonRepeatingCharacter(str) {
  // store freq of all chars of str
  for (let i = 0; i < str.length; i++) {
    if (str[i] in charsFreq) {
      charsFreq[str[i]] += 1;
    } else {
      charsFreq[str[i]] = 1;
    }
  }

  //   re-iterate all characters in str and find which character in charsFreq has freq of 1
  for (let i = 0; i < str.length; i++) {
    if (charsFreq[str[i]] === 1) {
      return i;
    }
  }
  return -1;
}
firstNonRepeatingCharacter("abca");
