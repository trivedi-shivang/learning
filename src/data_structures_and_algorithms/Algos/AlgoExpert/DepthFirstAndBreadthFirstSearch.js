// A graph is tree like structure. Each graph has vertices connected by edges. Depth-first and Breadth-first are two ways to traverse all nodes of the graph.

// Depth-first search works by starting with a root node and fetching that node's value and then depth-fist search is called on its children.
// Time O(V+E) where v is vertices and E is edges | O(V) space (considering space for the final array to store list of nodes) + O(V) function calls in call-stack

// Breadth-first search works by starting with a root node and then fetching all children nodes on one level down the root node. Then it fetches second-level children (which are children of first-level). So on...so forth...
// O(V+E) since we are traversing each vertice exactly once and also travelling children of those vertices (children of a vertice is determined by connected edges) | O(V) array size + O(V) (assuming case when n children of a root node lies on first-level and there are no more levels)

class Node {
  constructor(name) {
    this.children = [];
    this.name = name;
  }
  addChildToNode(childName, nodeName = this.name) {
    let node = this.findNode(nodeName);
    node.children.push(new Node(childName));
  }
  findNode(nodeName, node = this) {
    if (node.name === nodeName) return node;
    if (!node.children.length) return;
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        if (this.findNode(nodeName, node.children[i])) {
          return this.findNode(nodeName, node.children[i]);
        }
      }
    }
  }

  depthFirstSearch(array) {
    array.push(this.name);
    for (let child of this.children) {
      child.depthFirstSearch(array);
    }
    return array;
  }

  breadthFirstSearch(array) {
    let queue = [this];
    while (queue.length) {
      let current = queue.shift();
      array.push(current.name);
      for (let child of current.children) {
        queue.push(child);
      }
    }
    return array;
  }
}

// graph construction
// {
//     name= 'A',
//     children = [{
//         name: 'B',
//         children=[{
//             name:'E',
//             children:[]
//         }, {
//             name: 'F',
//             children:[]
//         }]
//     }, {
//         name:'C',
//         children:[]
//     },{
//         name:'D',
//         children=[{
//             name: 'G',
//             children=[{
//                 name:'K',
//                 children:[]
//             }]
//         }, {
//             name:'H',
//             children:[]
//         }]
//     }]
// }
let n = new Node("A");
n.addChildToNode("B");
n.addChildToNode("C");
n.addChildToNode("D");
n.addChildToNode("E", "B");
n.addChildToNode("F", "B");
n.addChildToNode("I", "F");
n.addChildToNode("J", "F");
n.addChildToNode("G", "D");
n.addChildToNode("H", "D");
n.addChildToNode("K", "G");
console.log(n.depthFirstSearch([])); //['A', 'B', 'E', 'F', 'I', 'J', 'C', 'D', 'G', 'K', 'H']
console.log(n.breadthFirstSearch([])); //['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
