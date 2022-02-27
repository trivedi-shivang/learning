// Given an non-empty string, we are asked to write a function that is going to run-length-encode the input string and return the encoded string. Run-length encoding refers to replacing repetitive, consecutive data by a count and one copy of a repeated data. For instance, AAABB will be encoded as 3A2B. If a sequence contains more than 9 consecutive, identical characters, we first encode 9 characters, then the remaining ones. For instance, AAAAAAAAAA (10 As) will be encode as 9A1A.
// O(n) Time | O(n) space
function runLengthEnconding(input) {
  let currentRunLength = 1;
  let encoding = [];
  for (let i = 1; i < input.length; i++) {
    let currentChar = input[i];
    let prevChar = input[i - 1];
    if (currentChar === prevChar && currentRunLength < 9) currentRunLength += 1;
    else {
      encoding.push(currentRunLength, prevChar);
      currentRunLength = 1;
    }
  }
  encoding.push(currentRunLength, input[input.length - 1]);
  return encoding.join("");
}
