// O(d) maximum time to traverse through the deepest node (sort of upper bound because less time will be required for travelling less deeper node) | O(1) Space
// following function parameters are given from the problem and all of them have an "ancestor" property
function getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
  depthOne = getDescendantDepth(descendantOne, topAncestor);
  depthTwo = getDescendantDepth(descendantTwo, topAncestor);
  //level the plain-field
  if (depthOne > depthTwo) {
    //   first descendant is deeper than second
    return backtrackAncestralTree(
      descendantOne,
      descendantTwo,
      depthOne - depthTwo
    );
  } else {
    return backtrackAncestralTree(
      descendantOne,
      descendantTwo,
      depthOne - depthTwo
    );
  }
}

function getDescendantDepth(descendant, topAncestor) {
  let depth = 0;
  while (descendant != topAncestor) {
    depth += 1;
    descendant = descendant.ancestor;
  }
  return depth;
}

//implemented recursively (assuming given descendant is a node in the graph)
function getDescendantDepth(descendant, topAncestor) {
  if (descendant === topAncestor) return 0;
  return 1 + getDescendantDepth(descendant.ancestor, topAncestor);
}

function backtrackAncestralTree(lowerDescendant, higherDescendant, diff) {
  while (diff > 0) {
    lowerDescendant = lowerDescendant.ancestor;
    diff -= 1;
  }
  while (lowerDescendant != higherDescendant) {
    lowerDescendant = lowerDescendant.ancestor;
    higherDescendant = higherDescendant.ancestor;
  }
  return lowerDescendant;
}
