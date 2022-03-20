// given a target amount (in $) and a denominations array (in $), find mininum coins needed to make target amount
// O(n*d) Time | O(n) space
function minNumberOfCoinsForChange(target, denominations) {
  let nums = Array(target + 1).fill(Infinity);
  nums[0] = 0; //minimum coins to make 0$ is 0
  for (let i = 0; i < denominations.length; i++) {
    let denom = denominations[i];
    for (let amount = 1; amount <= target; amount++) {
      if (denom <= amount) {
        nums[amount] = Math.min(nums[amount - denom] + 1, nums[amount]);
      }
    }
  }
  return nums[target];
}

minNumberOfCoinsForChange(6, [1, 2, 4]);
