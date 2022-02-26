// two arrays of equal length. one represent heights of students wearing red-shirts while other for students wearing blue shirts. each array will atleast have an element.
// can class photo with following constraints.
// 1. all red-shirt students have to be in same row.
// 2. all blue-shirt students have to be in same row.
// 3.there have to be two rows for the photo.
// 4.students in first row have to be shorter than corresponding students in the back row.

// greedy algorithm since every iteration looks out for next shortest student.
// O(nlog(n)) O(1)
function classPhotos(redShirtHeights, blueShirtHeights) {
  redShirtHeights.sort((a, b) => a - b);
  blueShirtHeights.sort((a, b) => a - b);
  for (let idx in redShirtHeights) {
    if (redShirtHeights[0] < blueShirtHeights[0]) {
      if (blueShirtHeights[idx] <= redShirtHeights[idx]) return false;
    } else {
      if (redShirtHeights[idx] <= blueShirtHeights[idx]) return false;
    }
  }
  return true;
}

classPhotos([1, 2, 3, 4], [5, 6, 7, 8]);
