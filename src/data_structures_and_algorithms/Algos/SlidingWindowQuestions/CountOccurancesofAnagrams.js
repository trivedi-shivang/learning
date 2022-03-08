// Given a str and ptrn, count occurances of all anagrams of ptrn in str. Anagrams of a string 'for' are
// 1. for
// 2. fro
// 1. ofr
// 1. orf
// 1. rof
// 1. rfo
// O(N) Time | O(N) Space (charFreqs)
function countOccurancesOfAnagrams(str, ptrn) {
  let i = 0;
  let j = 0;
  let anagramsCount = 0;
  let charFreqs = {};
  let distinctCharCount = 0;
  //   store all ptrn letter freqs
  while (i < ptrn.length) {
    if (ptrn[i] in charFreqs) {
      charFreqs[ptrn[i]] += 1;
    } else {
      charFreqs[ptrn[i]] = 1;
      distinctCharCount += 1;
    }
    i++;
  }
  i = 0;
  while (j < str.length) {
    while (j - i + 1 < ptrn.length) {
      if (str[j] in charFreqs) {
        charFreqs[str[j]] -= 1;
        if (charFreqs[str[j]] === 0) {
          distinctCharCount -= 1;
        }
      }
      j++;
    }
    if (j - i + 1 === ptrn.length) {
      if (str[j] in charFreqs) {
        charFreqs[str[j]] -= 1;
        if (charFreqs[str[j]] === 0) {
          distinctCharCount -= 1;
        }
      }
      if (distinctCharCount === 0) {
        anagramsCount++;
      }
      if (str[i] in charFreqs) {
        charFreqs[str[i]] += 1;
        if (charFreqs[str[i]] === 1) {
          distinctCharCount += 1;
        }
      }
    }
    i++;
    j++;
  }
  return anagramsCount;
}
countOccurancesOfAnagrams("aabaabaa", "aaba");
