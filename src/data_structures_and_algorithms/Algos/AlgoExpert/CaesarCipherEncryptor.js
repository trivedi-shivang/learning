// given a string (in this case lowecase letters) and a key (integer), return a new string which is formed by shifting each alphabet in a string by "key" characters
function caesarCipherEncryptor(str, key) {
  key = key % 26;
  let aCharCode = "a".charCodeAt();
  let zCharCode = "z".charCodeAt();
  let newStrArr = [];
  for (let i = 0; i < str.length; i++) {
    let codeDiff = zCharCode - (str[i].charCodeAt() + key);
    if (codeDiff < 0) {
      newStrArr.push(String.fromCharCode(aCharCode + Math.abs(codeDiff) - 1));
    } else {
      newStrArr.push(String.fromCharCode(str[i].charCodeAt() + key));
    }
  }
  return newStrArr.join("");
}
