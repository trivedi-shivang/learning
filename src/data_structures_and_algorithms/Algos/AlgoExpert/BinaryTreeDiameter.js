// given a BT root node, find its diameter. A diameter of BT is longest path between two leaf nodes. Longest path does not have to go through root.
// O(N) Time |o(n) Space
class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.right = right;
    this.left = left;
  }

  insert(value, node = this) {
    if (node.value > value) {
      if (node.left) {
        node = node.left;
        this.insert(value, node);
      } else {
        node.left = new BST(value);
        return;
      }
    } else {
      if (node.right) {
        node = node.right;
        this.insert(value, node);
      } else {
        node.right = new BST(value);
        return;
      }
    }
  }

  // goal is to go deep down to find deepest node. Since we are prioritizing deepest node, Depth first search node. If the node is a leaf node then diameter of the subtree is 0 and its height is 1.
  binaryTreeDiameter(tree) {
    return this.getTreeInfo(tree).diameter; //the function returns an object
  }

  getTreeInfo(tree) {
    if (!tree) return new TreeInfo(0, 0); //base
    // if not base case then what calculations
    let leftTreeData = this.getTreeInfo(tree.left);
    let rightTreeData = this.getTreeInfo(tree.right);
    let longestPathThroughRoot = leftTreeData.height + rightTreeData.height;
    let maxDiameterSoFar = Math.max(
      leftTreeData.diameter,
      rightTreeData.diameter
    );
    let currentDiameter = Math.max(maxDiameterSoFar, longestPathThroughRoot);
    let currentHeight = 1 + Math.max(leftTreeData.height, rightTreeData.height);
    return TreeInfo(currentDiameter, currentHeight);
  }
}

class TreeInfo {
  constructor(diameter, height) {
    this.diameter = diameter;
    this.height = height;
  }
}

let bst = new BST(10);
bst.insert(5);
// bst.insert(2);
// bst.insert(1);
// bst.insert(5);
bst.insert(15);
// bst.insert(13);
// bst.insert(14);
// bst.insert(22);
