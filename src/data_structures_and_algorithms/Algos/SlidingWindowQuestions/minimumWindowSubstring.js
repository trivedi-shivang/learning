// given a string str and another string pttrn. Find the minimum-window in str such that it has all the characters and of same quantity as that found in pttrn
function minimumWindowSubstring(str, pttrn) {
  let i = 0;
  let j = 0;
  let minimumWindowSubstr = '';
  let pttrnMapSize = 0;
  let pttrnMap = new Map();
  // store all characters of pttrn in a map
  while (i < pttrn.length) {
    if (pttrnMap.has(pttrn[i])) {
      pttrnMap.set(pttrn[i], pttrnMap.get(pttrn[i]) + 1);
    } else {
      pttrnMap.set(pttrn[i], 1);
      pttrnMapSize++;
    }
    i++;
  }
  i = 0;
  while (j < str.length) {
    if (pttrnMap.has(str[j])) {
      pttrnMap.set(str[j], pttrnMap.get(str[j]) - 1);
      if (pttrnMap.get(str[j]) === 0) {
        pttrnMapSize--;
      }
    }
    if (pttrnMapSize > 0) {
      j++;
    } else if (pttrnMapSize === 0) {
      while (pttrnMapSize === 0) {
        if(minimumWindowSubstr === '' || str.slice(i, j + 1).length<minimumWindowSubstr.length){
           minimumWindowSubstr = str.slice(i,j+1); 
        }
        pttrnMap.set(str[i], pttrnMap.get(str[i]) + 1);
        if (pttrnMap.get(str[i]) > 0) pttrnMapSize++;
        i++;
      }
      j++;
    }
  }
  return minimumWindowSubstr;
}

minimumWindowSubstring("time toc practice", "toc");
