// worst solution
// string concatenation takes O(n) because sometimes when such operation takes place, it has to copy all existing (n characters) to the new string and then add new character.
// O(n^2) Time (Concatenation for every string character) | O(n) length of new string
function palindromeCheck(str) {
  let newStr = "";
  for (let idx in str) {
    newStr += str[str.length - (1 + parseInt(idx))];
  }
  return newStr === str ? true : false;
}

// O(n) Time | O(n) space
function palindromeCheck(str) {
  return str.split("").reverse().join("") === str ? true : false;
}

// another solution
// O(n) Time | O(1)
function palindromeCheck(str) {
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) return false;
    i++;
    j--;
  }
  return true;
}

// using recursion
// O(n/2) = O(n) Time (n/2 comparison of string characters) |O(n) callstack
function palindromeCheck(str) {
  return isPalindrome(str);
}

function isPalindrome(str) {
  if (str.length <= 1) return true;
  return (
    str[0] === str[str.length - 1] && isPalindrome(str.slice(1, str.length - 1))
  );
}
