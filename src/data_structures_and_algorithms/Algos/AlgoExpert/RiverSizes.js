// You're given a two-dimensional array (a matrix) of potentially unequal height
// and width containing only 0s and 1s. Each
// 0 represents land, and each 1 represents part of a
// river. A river consists of any number of 1s that are either
// horizontally or vertically adjacent (but not diagonally adjacent). The number
// of adjacent 1s forming a river determine its size.
// ;

// Note that a river can twist. In other words, it doesn't have to be a straight
// vertical line or a straight horizontal line; it can be L-shaped, for example.

// Write a function that returns an array of the sizes of all rivers represented
// in the input matrix. The sizes don't need to be in any particular order.

// O(wh) Time/Space where w is width of the matrix and h is the height of the matrix.
function riverSizes(matrix) {
  // size of different possible rivers found in the matrix
  let sizes = [];
  let visited = Array(matrix.length)
    .fill(0)
    .map((_) => Array(matrix[0].length));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (visited[i][j]) continue;
      console.log("traversing ", matrix[i][j], "  ", visited);
      traverseNode(i, j, matrix, visited, sizes);
    }
  }
  return sizes;
}

function traverseNode(i, j, matrix, visited, sizes) {
  // not sure if the node is 0 or 1. Thus initialized to 0
  currentRiverSize = 0;
  //   depth-first search iteratively.
  nodesToExplore = [[i, j]];
  while (nodesToExplore.length) {
    currentNode = nodesToExplore.pop();
    i = currentNode[0];
    j = currentNode[1];
    // necessary check for a pair of [i,j] which is added to nodesToExplore but not popped and somehow that same node is pushed again. after the first occurance of that pair popped and visited, it is necessary to make sure that we don't visit that node again.
    if (visited[i][j]) continue;
    visited[i][j] = true;
    console.log("currentNode ", currentNode);
    if (matrix[i][j] === 0) continue;
    currentRiverSize += 1;
    unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
    for (let neighbor of unvisitedNeighbors) nodesToExplore.push(neighbor);
    console.log("unvisitedNeighbors ", unvisitedNeighbors);
  }
  if (currentRiverSize > 0) {
    sizes.push(currentRiverSize);
  }
}

function getUnvisitedNeighbors(i, j, matrix, visited) {
  unvisitedNeighbors = [];
  //   not in the first line
  if (i > 0 && !visited[i - 1][j]) {
    unvisitedNeighbors.push([i - 1, j]);
  }
  if (i < matrix.length - 1 && !visited[i + 1][j]) {
    unvisitedNeighbors.push([i + 1, j]);
  }
  if (j > 0 && !visited[i][j - 1]) {
    unvisitedNeighbors.push([i, j - 1]);
  }
  if (j < matrix[0].length - 1 && !visited[i][j + 1]) {
    unvisitedNeighbors.push([i, j + 1]);
  }
  return unvisitedNeighbors;
}

riverSizes([
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0],
]);
