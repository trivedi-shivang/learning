class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  //   Avg O(log(n)) | O(1)
  //   Worst O(n) | O(1)
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return this;
    }
    let currentNode = this.root;
    while (true) {
      if (currentNode.value > value) {
        if (!currentNode.left) {
          currentNode.left = new Node(value);
          return this;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new Node(value);
          return this;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  //   Avg O(log(n)) | O(1)
  //   Worst O(n) | O(1)
  contains(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === value) return true;
      else {
        if (currentNode.value > value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return false;
  }

  // get the minimum value of the right subtree
  getMinValue(node) {
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  //   first find the node you want to remove
  // second perform operations surrouding the node to be removed.
  remove(value, currentNode, parentNode = null) {
    currentNode = currentNode || this.root;
    //   find the node to be removed
    while (currentNode) {
      if (currentNode.value > value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        // node with two child nodes.
        if (currentNode.left && currentNode.right) {
          currentNode.value = this.getMinValue(currentNode.right);
          this.remove(currentNode.value, currentNode.right, currentNode);
        } else if (!parentNode) {
          if (currentNode.left) {
            currentNode.value = currentNode.left.value;
            currentNode.right = currentNode.left.right;
            currentNode.left = currentNode.left.left;
          } else if (currentNode.right) {
            currentNode.value = currentNode.right.value;
            currentNode.left = currentNode.right.left;
            currentNode.right = currentNode.right.right;
          }
          // currentNode which does not have any children and does not have parentNode as well
          else {
            currentNode.value = null;
          }
        }
        // parentNode has currentNode as either left or right child.
        else if (parentNode.left === currentNode) {
          parentNode.left = currentNode.left || currentNode.right;
          return;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left || currentNode.right;
          return;
        }
        break;
      }
    }
  }

  closest(value) {
    let currentNode = this.root;
    let closest = 0;
    while (currentNode) {
      if (!currentNode.left && !currentNode.right) return currentNode.value;
      if (Math.abs(currentNode.value) < Math.abs(closest - value)) {
        closest = currentNode.value;
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          return closest;
        }
      } else {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          return closest;
        }
      }
    }
  }

  // recursively
  closest(tree, target) {
    return this.findClosestValueInBSTHelper(tree, target, this.root.value);
  }

  findClosestValueInBSTHelper(tree, target, closest) {
    if (!tree) {
      return closest;
    }
    if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
      closest = tree.value;
    }
    if (target < tree.value) {
      tree = tree.left;
      return this.findClosestValueInBSTHelper(tree, target, closest);
    } else if (target > tree.value) {
      tree = tree.right;
      return this.findClosestValueInBSTHelper(tree, target, closest);
    } else {
      return closest;
    }
  }

  // branch sums
  branchSums(tree) {
    let result = [];
    this.findBranchSumsInBSTHelper(tree, result);
    return result;
  }

  findBranchSumsInBSTHelper(tree, result, sum = 0) {
    if (!tree) return;
    if (!tree.left && !tree.right) {
      result.push(sum + tree.value);
      return;
    } else {
      sum += tree.value;
      // if (tree.left) {
      // tree = tree.left;
      sum + this.findBranchSumsInBSTHelper(tree.left, result, sum);
      // }
      // if (tree.right) {
      // tree = tree.right;
      sum + this.findBranchSumsInBSTHelper(tree.right, result, sum);
      // }
    }
  }
}

let b = new BST();
b.insert(10);
b.insert(6);
b.insert(5);
b.insert(1);
b.insert(7);
b.insert(15);
b.insert(12);
b.insert(11);
b.insert(16);
// console.log(b.contains(5));
b.remove(10);
// console.log(b.closest(12));
console.log(b.closest(b.root, 12));
console.log(b.branchSums(b.root));
// console.log(b);
