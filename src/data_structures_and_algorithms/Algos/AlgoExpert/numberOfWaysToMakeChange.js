// given a target integer and denominations arr (both of same unit i.e dollar), find number of ways to make change
// O(nd) Time | O(n) Space
function numberOfWaysToMakeChange(target, denominations) {
  ways = Array(target + 1).fill(0);
  ways[0] = 1; //number of ways to make 0$ with any denominations is 1 because there is only one to not choose any denomination
  for (let denom of denominations) {
    for (let i = 1; i <= target + 1; i++) {
      let amount = i;
      if (denom <= amount) {
        //because there is no way you can select a denom to make the amount if denom>amount
        ways[amount] += ways[amount - denom];
      }
    }
  }
  return ways[target];
}

console.log(numberOfWaysToMakeChange(10, [1, 5, 10, 25]));
