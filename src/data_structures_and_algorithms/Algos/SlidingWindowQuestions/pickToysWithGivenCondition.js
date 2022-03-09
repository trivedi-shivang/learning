// given a string consisting of toys. boy has to maximize choosing of toys from substr with maximum of two types of toys
function pickToysWithGivenCondition(str) {
  let i = 0;
  let j = 0;
  let toysFreq = new Map();
  let maximumToysCount = 0;
  while (j < str.length) {
    if (toysFreq.has(str[j])) {
      toysFreq.set(str[j], toysFreq.get(str[j]) + 1);
    } else {
      toysFreq.set(str[j], 1);
    }
    if (toysFreq.size < 2) {
      j++;
    } else if (toysFreq.size === 2) {
      maximumToysCount = Math.max(maximumToysCount, j - i + 1);
      j++;
    } else {
      while (toysFreq.size > 2) {
        toysFreq.set(str[i], toysFreq.get(str[i]) - 1);
        if (toysFreq.get(str[i]) === 0) {
          delete toysFreq.delete(str[i]);
        }
        i++;
      }
      j++;
    }
  }
  return maximumToysCount;
}

pickToysWithGivenCondition("abcaacbbaa"); //here each character in a string represents a type of a toy
