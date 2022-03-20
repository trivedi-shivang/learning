// given a BT root node and a node (guaranteed to be a node of BT), find its successor. A successor is the next node visited in inorder traversal.
// O(N) Time |o(n) Space
class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
  }

  insert(value, node = this) {
    if (node.value > value) {
      if (node.left) {
        node = node.left;
        this.insert(value, node);
      } else {
        node.left = new BST(value);
        node.left.parent = node;
        return;
      }
    } else {
      if (node.right) {
        node = node.right;
        this.insert(value, node);
      } else {
        node.right = new BST(value);
        node.right.parent = node;
        return;
      }
    }
  }

  //   naive approach
  //   O(2N) = O(N) Time (traversing all nodes + running a for loop) | O(N+h) = O(N) (O(h) max function calls + O(N) space for inOrderTraversalValues array)
  //   findSuccessor(node) {
  //     //   find inordertraversal
  //     let inOrderTraversalValues = [];
  //     this.getInOrderTraversalValues(inOrderTraversalValues, this);
  //     // find successor by finding the idx of the given node and then returning the value after that.
  //     for (let idx = 0; idx < inOrderTraversalValues.length; idx++) {
  //       if (inOrderTraversalValues[idx] === node.value) {
  //         if (idx === inOrderTraversalValues.length - 1) return null;
  //         return inOrderTraversalValues[idx + 1];
  //       }
  //     }
  //   }

  //   getInOrderTraversalValues(inOrderTraversalValues, tree) {
  //     if (!tree) return inOrderTraversalValues;
  //     this.getInOrderTraversalValues(inOrderTraversalValues, tree.left);
  //     inOrderTraversalValues.push(tree.value);
  //     this.getInOrderTraversalValues(inOrderTraversalValues, tree.right);
  //   }

  //   what are the observations?
  //   1. parent property is given on BST
  //   2. if a node has a right node, its successor is the leftmost node in right subtree
  //   3. if a node does not have a right node, then the successor will be one of its ancestors.
  findSuccessor(node, tree = this) {
    node = this.findNode(tree, node);
    if (node.right) {
      return this.getLeftMostChild(node);
    }
    return this.getRightMostParent(node);
  }

  findNode(tree, node) {
    if (!tree) return;
    if (tree.value === node.value) {
      return tree;
    }
    let leftNodeRef = this.findNode(tree.left, node);
    if (leftNodeRef) {
      return leftNodeRef;
    }
    let rightNodeRef = this.findNode(tree.right, node);
    if (rightNodeRef) {
      return rightNodeRef;
    }
  }

  getLeftMostChild(node) {
    let currentNode = node.right;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  getRightMostParent(node) {
    let currentNode = node;
    while (currentNode.parent && currentNode.parent.right == currentNode) {
      currentNode = currentNode.parent;
    }
    return currentNode.parent;
  }
}

let bst = new BST(10);
bst.insert(5);
bst.insert(2);
bst.insert(1);
bst.insert(5);
bst.insert(15);
bst.insert(13);
bst.insert(14);
bst.insert(22);
let node = {
  value: 5,
  left: {
    value: 1,
    left: null,
    right: null,
  },
  right: {
    value: 5,
    left: null,
    right: null,
  },
};
console.log(bst.findSuccessor(node));
