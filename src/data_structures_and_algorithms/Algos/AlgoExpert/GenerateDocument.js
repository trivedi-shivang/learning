// given two inputs (both of string type). Return true if document string can be made from characters or not.
// O(m+n) Time where m is length of document string and n is length of characters string. | O(m) Space
function generateDocument(characters, document) {
  let documentChars = {};
  // iterate over document and store freq of each character in an object
  for (let i = 0; i < document.length; i++) {
    if (document[i] in documentChars) {
      documentChars[document[i]] += 1;
    } else {
      documentChars[document[i]] = 1;
    }
  }

  //   itearate over "characters" string and see if each char in the string has an entry in documentChars or not
  for (let i = 0; i < characters.length; i++) {
    if (characters[i] in documentChars) {
      if (documentChars[characters[i]] === 0) return false;
      documentChars[characters[i]] -= 1;
      if (documentChars[characters[i]] === 0) {
        delete documentChars[characters[i]];
      }
    }
  }
  return Object.keys(documentChars).length > 0 ? false : true;
}

generateDocument("BSte!hetsi ogEAxpelrt x ", "AlgoExpert is the Best!");

// Other solutions
// 1. For every character in "document", count occurances of that character in "document" and in "character" strings and compare if they are equal. if they are not then return;
// O(m*(n+m)) Time | O(1) Space where m is the length of the "document" and n is the length of "character"

// 2. Similar to solution 1. BUT assume that the characters in "document" are duplicate then instead of counting frequency of that character multiple times during different iterations,better store each character in a Set (if it does not exist) and skip iteration when you encounter the character which you already encountered before.
// O(c*(m+n)) where c is unique characters in "document" Time Complexity | O(m)
function generateDocument(characters, document) {
  let chars = new Set();
  for (let i = 0; i < document.length; i++) {
    if (!chars.has(document[i])) {
      chars.add(document[i]);
      //   find all occurances of a character in "document"
      let counter = 1;
      let j = i + 1;
      while (j < document.length) {
        if (document[j] === document[i]) counter++;
        j++;
      }
      //   find occurances of the character in "characters"
      j = 0;
      while (j < characters.length) {
        if (characters[j] === document[i]) {
          counter--;
        }
        j++;
      }
      if (counter > 0) return false;
    }
  }
  return true;
}

console.log(generateDocument("a", "a"));
console.log(
  generateDocument("BSte!hetsi ogEAxpelrt x ", "AlgoExpert is the Best!")
);
console.log(generateDocument("", "a"));
