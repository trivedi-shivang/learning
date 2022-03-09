// O()
function longestSubstringWithNonRepeatingCharacters(str) {
  let i = 0;
  let j = 0;
  let charFreqs = new Map();
  let maxWinSize = 0;
  while (j < str.length) {
    if (charFreqs.has(str[j])) {
      charFreqs.set(str[j], charFreqs.get(str[j]) + 1);
    } else {
      charFreqs.set(str[j], 1);
    }
    if (j - i + 1 > Object.keys(charFreqs).length) {
      while (j - i + 1 > Object.keys(charFreqs).length) {
        charFreqs[str[i]] -= 1;
        if (charFreqs[str[i]] === 0) {
          delete charFreqs[str[i]];
        }
        i++;
      }
      j++;
    } else if (j - i + 1 === Object.keys(charFreqs).length) {
      maxWinSize = Math.max(maxWinSize, j - i + 1);
      j++;
    }
  }
  return maxWinSize;
}

longestSubstringWithNonRepeatingCharacters("pwwkew");
