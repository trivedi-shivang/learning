// given a graph containing atleast a node in it, find if the graph has a cycle in it. Each node is connected to another node via directed and unweighted lines. Directed means an edge connecting two nodes points from one node to another. The direction in which it points determines the direction in which graph can be traversed. Unweighted means edges do not have higher or lower priorities to be traversed. Return true if there is a cycle in the graph or return false. A cycle is considered when we start traversing from a node and come back to the same node. A node pointing to itself is called self-loop.

// you are not given a graph. instead, you are given an adjacency list. A list is array of arrays. Each element's index represents a vertex and each elements in sub-array represents outbound vertices the vertex points to. For Ex:
// [[1, 3], [2, 3, 4], [0], [], [2, 5], []];
// the first index is 0. So there is a vertex with a value 0 having edges pointing 0 to 1 and 0 to3. Similarly, 2nd index is 1, pointing 1->2, 1->3, 1->4.

// If a graph is given, run DFS or BFS to solve the problem.
// Here there are different types of edges convetions are considered to solve the problem. Each node has an ancestor from

function cycleInGraph(edges) {
  let numberOfNodes = edges.length; //adjacency-list' length
  let visited = new Array(numberOfNodes).fill(false); //nodes when visited will be marked as true in this array.
  let currentlyInStack = new Array(numberOfNodes).fill(false);
  for (let node = 0; node < edges.length; node++) {
    //why for loop? because consider all nodes are not connected to each other. in that case, we need to traverse all subgraphs
    if (visited[node]) {
      //why? because isNodeInCycle runs DFS and there is a possibility that in that DFS we might visit a node. So to not visit again we continue without doing any processing on that node.
      continue;
    }
    let containsCycle = isNodeInCycle(edges, node, visited, currentlyInStack);
    if (containsCycle) return true;
  }
  return false;
}

function isNodeInCycle(edges, node, visited, currentlyInStack) {
  visited[node] = true;
  currentlyInStack[node] = true;
  let neighbours = edges[node];
  for(let neighbour of neighbours){
      if(!visited[neighbour]){
          let containsCycle = 
      }
  }
}
