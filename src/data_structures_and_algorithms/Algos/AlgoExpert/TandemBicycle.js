// two arrays of equal length. one represent speed of cyclists wearing red-shirts while other for cyclists wearing blue shirts. each array will atleast have an element.
// there will be a third parameter called fastest (boolean) to return maximum tandem-bicycle speed of all pairs if the parameter has a value of true or minimum tandem-bicycle speed of all pairs if the parameter is false.
// a tandem bicyle pair consists of one red and one blue cyclist. Maximum and minimum bicycle speed of the pair is the maximum speed of the cyclists in the pair.

// greedy algorithm since every iteration looks out for next least speedy cyclist.
// O(nlog(n)) O(1)
function tandemBicycle(redShirtCyclists, blueShirtCyclists, fastest) {
  // sort but arrays
  redShirtCyclists.sort((a, b) => a - b);
  blueShirtCyclists.sort((a, b) => a - b);
  let maximumSpeed, minimumSpeed;
  maximumSpeed = minimumSpeed = 0;
  if (fastest) {
    //  pairing high-speed red-shirt cyclist with low-speed blue-shirt cyclist and similarly pairing high-speed blue-shirt cyclist with low-speed blue-shirt cyclist
    for (let idx in redShirtCyclists) {
      maximumSpeed += Math.max(
        redShirtCyclists[parseInt(idx)],
        blueShirtCyclists[blueShirtCyclists.length - (1 + parseInt(idx))]
      );
    }
  } else {
    //  pairing low-speed red-shirt cyclist with low-speed blue-shirt cyclist will have least maximum tandem-bicycle speed pair.similarly for other pairs.
    for (let idx in redShirtCyclists) {
      minimumSpeed += Math.max(
        redShirtCyclists[parseInt(idx)],
        blueShirtCyclists[parseInt(idx)]
      );
    }
  }
  return fastest ? maximumSpeed : minimumSpeed;
}

tandemBicycle([1, 3], [2, 3], true);
