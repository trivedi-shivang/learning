function longestSubstringWithKUniqueCharacters(str, k) {
  let i = 0;
  let j = 0;
  let charFreqs = new Map(); //will store "str" character freqs
  let maxWinSize = 0;
  while (j < str.length) {
    if (charFreqs.has(str[i])) {
      charFreqs.set(str[j], charFreqs.get(str[j]) + 1);
    } else {
      charFreqs.set(str[j], 1);
    }
    if (charFreqs.size < k) {
      j++;
    } else if (charFreqs.size === k) {
      maxWinSize = Math.max(maxWinSize, j - i + 1);
      j++;
    } else if (charFreqs.size > k) {
      while (charFreqs.size > k) {
        charFreqs.set(str[i], charFreqs.get(str[i]) - 1);
        if (charFreqs.get(str[i]) === 0) {
          charFreqs.delete(str[i]);
        }
        i++;
      }
      j++;
    }
  }
  return maxWinSize;
}

longestSubstringWithKUniqueCharacters("aabacbebebe", 3);
