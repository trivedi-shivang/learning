class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild(name) {
    if (typeof name === "object") {
      this.children.push(name);
    } else {
      this.children.push(new Node(name));
    }
  }

  // O(V+E) V- Vertices and E-Edges (we are visiting every vertice and for every vertice we are running the function on its children) | O(V) (number of frames on call-stack) or O(V) to store vertices in the "array".
  depthFirstSearch(array) {
    array.push(this.name);
    for (let child of this.children) {
      child.depthFirstSearch(array);
    }
    return array;
  }

  //   O(V + E) we loop through all edges of a node and we place all vertices of the node in the array | O(V) (output of the array) + queue's length (won't be O(V) but imagine all root nodes are children of the root node)
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

let f = new Node("F");
f.addChild("I");
f.addChild("J");
let b = new Node("B");
b.addChild("E");
b.addChild(f);
let c = new Node("C");
let g = new Node("G");
g.addChild("K");
let d = new Node("D");
d.addChild(g);
d.addChild("H");
let a = new Node("A");
a.addChild(b);
a.addChild(c);
a.addChild(d);
let array = [];
// console.log(a.depthFirstSearch(array));
array = [];
console.log(a.breadthFirstSearch(array));
