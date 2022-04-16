// given a BT (Binary Tree), find if this data structure is BST or not.
// o(N) (iterate all elements of the Binary Tree to check if all of them satisfies BST property)| O(d) (depth of the longest branch)
function validateBST(tree = this) {
  return validateBSTHelper(tree, -Infinity, Infinity);
}

function validateBSTHelper(tree, minValue, maxValue) {
  if (!tree) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  let leftIsValid = validateBSTHelper(tree.left, minValue, tree.value);
  let rightIsValid = validateBSTHelper(tree.right, tree.value, maxValue);
  return leftIsValid && rightIsValid;
}

class BST {
  constructor(value, left = null, right = null, parent = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }

  // add insertion, deletion and searching functions for BST (Binary Search Tree)
  // A BST is a speicial type of Binary Tree (BT). A BT is a datastructure that consist of nodes. Each node has a value. Each node has two or upto two nodes. A BST is a special BT in which a node's value must be strictly greater than all node values on the left and less than equal to all node-values to its right. The left and right children nodes have also to satisfy the BST property
  // For Inserting a node in BST, start checking new node's value with the root and see where it should be placed so that the tree satisfies BST property. Check the same if the root has children nodes and do it untill you reach one of the parent nodes which has leaf nodes. This way every time when inserting a node, you will reduce insertion area by half every time by checking.
  // Avg O(Log N) | O(1) | Worst O(N) skewed right BST | O(1)
  insert(value) {
    let currentNode = this;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = new BST(value);
          currentNode.left.parent = currentNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new BST(value);
          currentNode.right.parent = currentNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return this;
  }

  // O(logn) | O(logN)
  insertRecursively(value) {
    if (value < this.value) {
      if (!this.left) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (!this.right) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  // Avg O(Log N) | O(1) | Worst O(N) skewed right BST | O(1)
  contains(value) {
    let currentNode = this;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  getMinValue() {
    let currentNode = this;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }

  // Avg O(Log N) | O(1) | Worst O(N) skewed right BST | O(1)
  remove(value, parentNode = null) {
    // first find the node we are trying to remove and then remove the node
    let currentNode = this;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        // found the node to be removed
        // the node has two children nodes. find the smallest value in the right subtree
        if (currentNode.left && currentNode.right) {
          currentNode.value = currentNode.right.getMinValue();
          currentNode.right.remove(currentNode.value, currentNode);
        } else if (!parentNode) {
          if (currentNode.left) {
            currentNode.value = currentNode.left.value;
            currentNode.right = currentNode.left.right;
            currentNode.left = currentNode.left.left;
          } else if (currentNode.right) {
            currentNode.value = currentNode.right.value;
            currentNode.left = currentNode.right.left;
            currentNode.right = currentNode.right.right;
          } else {
            currentNode.value = null;
          }
        } else if (parentNode.left === currentNode) {
          // when the node to be deleted is the only child of its parentNode
          parentNode.left = currentNode.left || currentNode.right;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left || currentNode.right;
        }
        break;
      }
    }
    return this;
  }

  // find the closest value in BST
  // O(log N) | O(log N) | Worst O(N) | O(N)
  findClosestValue(target) {
    return this.findClosestValueInBSTHelper(this, target, Infinity);
  }

  findClosestValueInBSTHelper(tree, target, closest) {
    if (!tree) {
      return closest;
    }
    if (Math.abs(target - closest) > Math.abs(tree.value - target)) {
      closest = tree.value;
    }
    if (tree.value < target) {
      this.findClosestValueInBSTHelper(tree.right, target, closest);
    } else if (tree.value > target) {
      this.findClosestValueInBSTHelper(tree.left, target, closest);
    } else {
      return closest;
    }
  }

  // iteratively
  // O(logN) | O(1) | Worst O(N) | O(1)
  findClosestValue(target) {
    return this.findClosestValueInBSTHelper(this, target, Infinity);
  }

  findClosestValueInBSTHelper(tree, target, closest) {
    let currentNode = tree;
    while (currentNode) {
      if (Math.abs(target - closest) > Math.abs(currentNode.value - target)) {
        closest = currentNode.value;
      }
      if (currentNode.value < target) {
        currentNode = currentNode.right;
      } else if (currentNode.value > target) {
        currentNode = currentNode.left;
      } else {
        break;
      }
    }
    return closest;
  }

  // given a BT, find branch sums. A branch sum is the sum of all nodes of a branch of the BT. A branch is a path in a Binary tree which start from root node to a leaf nodes.
  // O(N) iterating all nodes
  //  O(log N) (number of nodes in a call-stack)  + O(N) number of leaf nodes (approx N/2 nodes are leaf nodes in balance binary tree  = O(N) (since N is greater than logN)
  // space complexity is also bounded by O(N) since there cannot be more than N nodes
  branchSums(root = this) {
    let sums = [];
    this.calculateBranchSums(root, 0, sums);
    return sums;
  }

  calculateBranchSums(node, runningSum, sums) {
    if (!node) return;
    let newRunningSum = node.value + runningSum;
    if (!node.left && !node.right) {
      sums.push(newRunningSum);
      return;
    }
    this.calculateBranchSums(node.left, newRunningSum, sums);
    this.calculateBranchSums(node.right, newRunningSum, sums);
  }

  // for a given BT, find node-depths. For each node its depth is its distance from root node. This distance is also measure by number of edges from the node to the root node.
  // o(N) | O(h) h is height
  nodeDepths(root = this) {
    let sumOfDepths = 0;
    let stack = [{ node: root, depth: 0 }];
    while (stack.length) {
      let nodeInfo = stack.pop();
      let node = nodeInfo["node"];
      let depth = nodeInfo["depth"];
      if (!node) continue;
      sumOfDepths += depth;
      stack.push({ node: node.left, depth: depth + 1 });
      stack.push({ node: node.right, depth: depth + 1 });
    }
    return sumOfDepths;
  }

  // O(N) time | O(h) space
  nodeDepths(root, depth = 0) {
    // handle base case of recursion
    if (!root) return 0;
    return (
      depth +
      this.nodeDepths(root.left, depth + 1) +
      this.nodeDepths(root.right, depth + 1)
    );
  }

  // exploring graph which will be tree like data structure. Graph is made up of nodes. traverse the graph in depth-first search
  depthFirstSearch(depthFirstNodes = [], root = this) {
    if (!root) {
      return;
    }
    depthFirstNodes.push(root.value);
    this.depthFirstSearch(depthFirstNodes, root.left);
    this.depthFirstSearch(depthFirstNodes, root.right);
  }

  // given a BST, traverse it in in-order, pre-order, and post-order manner
  // O(N) | O(N) result array
  // In-Order: sorted in ascending order: left node first then current node then right node
  inOrderTraversal(array = [], tree = this) {
    if (!tree) return;
    this.inOrderTraversal(array, tree.left);
    array.push(tree.value);
    this.inOrderTraversal(array, tree.right);
    return array;
  }

  // PreOrder: current-node then left node then right node
  preOrderTraversal(array = [], tree = this) {
    if (!tree) return;
    array.push(tree.value);
    this.preOrderTraversal(array, tree.left);
    this.preOrderTraversal(array, tree.right);
    return array;
  }

  // PostOrder: left node then right node then current-node
  postOrderTraversal(array = [], tree = this) {
    if (!tree) return;
    this.postOrderTraversal(array, tree.left);
    this.postOrderTraversal(array, tree.right);
    array.push(tree.value);
    return array;
  }

  // given a sorted array of distinct integers, construct min-height BST. A height of a BST is the length of its longest branch.
  // To create a min-height BST, we need to have balanced BST. A balanced BST we need to have almost as many children in left subtree as in right subtree.
  //Thus, using sorted array, we can take the middle array element as the root node.
  //   O(NlogN) (because insertRecursively takes logn time to insert a new node since it insert new node's value by comparing value with root-idx and going down to find the right spot to insert. since we are inserting n nodes thus nlogn| O(N) inserting n nodes at once
  minHeightBST(array) {
    return this.constructMinHeightBST(array, null, 0, array.length - 1);
  }

  constructMinHeightBST(array, bst, startIdx, endIdx) {
    if (endIdx < startIdx) return;
    let midIdx = Math.floor((startIdx + endIdx) / 2);
    let valueToAdd = array[midIdx];
    if (!bst) {
      bst = new BST(valueToAdd);
    } else {
      bst.insertRecursively(valueToAdd);
    }
    this.constructMinHeightBST(array, bst, startIdx, midIdx - 1);
    this.constructMinHeightBST(array, bst, midIdx + 1, endIdx);
    return bst;
  }

  // O(n) | O(N)
  minHeightBST(array) {
    return this.constructMinHeightBST(array, null, 0, array.length - 1);
  }

  constructMinHeightBST(array, bst, startIdx, endIdx) {
    if (endIdx < startIdx) return;
    let midIdx = Math.floor((startIdx + endIdx) / 2);
    newBstNode = new BST(array[midIdx]);
    if (!bst) {
      bst = newBstNode;
    } else {
      if (array[midIdx] < bst.value) {
        bst.left = newBstNode;
        bst = bst.left;
      } else {
        bst.right = newBstNode;
        bst = bst.right;
      }
    }
    this.constructMinHeightBST(array, bst, startIdx, midIdx - 1);
    this.constructMinHeightBST(array, bst, midIdx + 1, endIdx);
    return bst;
  }

  //   same implementation as above but cleaner code.
  minHeightBST(array) {
    return this.constructMinHeightBST(array, 0, array.length - 1);
  }

  constructMinHeightBST(array, startIdx, endIdx) {
    if (endIdx < startIdx) {
      return null;
    }
    let midIdx = Math.floor((startIdx + endIdx) / 2);
    let bst = new BST(array[midIdx]);
    bst.left = this.constructMinHeightBST(array, startIdx, midIdx - 1);
    bst.right = this.constructMinHeightBST(array, midIdx + 1, endIdx);
    return bst;
  }

  //   given a BST, find the kth largest value (k<= N where N is the number of nodes of BST). for k=1, find the largest node in BST, for k=2, find the second-largetst value and so on....
  //   brute force approach find in-order traversal(left, value, right) and then return kth largest value
  // o(N) for in-order traversal | O(N) to store in-order traversal value.
  findKthLargestValueInBst(k, tree = this) {
    let sortedNodeValues = [];
    this.inOrderTraversal(sortedNodeValues, tree);
    return sortedNodeValues[sortedNodeValues.length - k];
  }

  //   suppose to be for the function above but a similar function declaration already exists.
  //   inOrderTraversal(sortedNodeValues, node) {
  //     if (!node) return;
  //     this.inOrderTraversal(sortedNodeValues, node.left);
  //     sortedNodeValues.push(node.value);
  //     this.inOrderTraversal(sortedNodeValues, node.right);
  //   }

  //   find the right most value in BST (that will be the largest value). Then search k nodes from it
  treeInfo = {
    numberOfNodesVisited: 0,
    latestVisitedValue: -1,
    rootIdx: 0,
    diameter: 0,
    height: 0,
  };

  //   O(k+h) (visiting right-most value which could be in longest branch. Thus 'h' for that. once at the rightmost value, then visiting k nodes to find kth node's value. ) | O(h) atmost h function calls in call-stack.
  findKthLargestValueInBst(k, tree = this) {
    reverseInOrderTraverse(tree, k, treeInfo);
    return this.treeInfo.latestVisitedValue;
  }

  reverseInOrderTraverse(tree, k, treeInfo) {
    if (!node || treeInfo.numberOfNodesVisited >= k) return;
    this.reverseInOrderTraverse(tree.right, k, treeInfo);
    if (treeInfo.numberOfNodesVisited < k) {
      treeInfo.numberOfNodesVisited += 1;
      treeInfo.latestVisitedValue = node.value;
      this.reverseInOrderTraverse(tree.left, k, treeInfo);
    }
  }

  //   given an array containing pre-order traversal values of a BST, construct a unique BST from them. if the pre-order traversal of a BT is given instead of BST then there are multiple BST which can be created from them.
  //   one approach is following:
  // O(N^2) for every n nodes in pre-order traversal array, we are iterating through that array to find rightsubtreeidx (maximum n traversals) | O(h) for function-calls and O(N) for constructing BST
  reconstructBst(preOrderTraversalValues) {
    if (preOrderTraversalValues.length === 0) return null;
    let currentValue = preOrderTraversalValues[0];
    let rightSubTreeRootIdx = preOrderTraversalValues.length; //if rightsubtree does not exist then we can confirm that all elements after the root-element will be part of left-subtree
    for (let i = 1; i < preOrderTraversalValues.length; i++) {
      //used to be i=0 but that would inaccurate results for the "if" condition beneath since it will always consider all elements after root-node to be in right subtree and not possibility of having them in left subtree.
      let value = preOrderTraversalValues[i];
      if (value >= currentValue) {
        // used to be value>currentValue (true for distinct integers). But for duplicate values, we need '>=' because that will allow values greater than equal to the rootnode to be in the right subtree of the root node.
        // we found the right-child
        rightSubTreeRootIdx = i;
        break;
      }
    }
    let leftSubTree = this.reconstructBst(
      preOrderTraversalValues.slice(1, rightSubTreeRootIdx)
    ); // "1" because we left-subtree will have values after root node's value "0" and before rightSubtreeIdx
    let rightSubTree = this.reconstructBst(
      preOrderTraversalValues.slice(rightSubTreeRootIdx)
    );
    return new BST(currentValue, leftSubTree, rightSubTree);
  }

  //   O(N) time iterating through all nodes | O(h) call-stack function-calls + O(N) to create the BST output.
  reconstructBst(preOrderTraversalValues) {
    return reconstructBstFromRange(
      -Infinity,
      Infinity,
      preOrderTraversalValues,
      treeInfo
    );
  }

  reconstructBstFromRange(
    lowerBound,
    upperBound,
    preOrderTraversalValues,
    currentSubTreeInfo
  ) {
    if (currentSubTreeInfo.rootIdx === preOrderTraversalValues.length)
      return null;
    let rootValue = preOrderTraversalValues[currentSubTreeInfo.rootIdx];
    if (rootValue < lowerBound || rootValue >= upperBound) return null; // used to be rootValue<= lowerBound (true for distinct integers). But for duplicate values, we need '<' becausethat will allow values greater than equal to the rootnode to be in the right subtree of the root node.
    currentSubTreeInfo.rootIdx += 1;
    let leftSubTree = this.reconstructBstFromRange(
      lowerBound,
      rootValue,
      preOrderTraversalValues,
      treeInfo
    );
    let rightSubTree = this.reconstructBstFromRange(
      rootValue,
      upperBound,
      preOrderTraversalValues,
      treeInfo
    );
    return new BST(rootValue, leftSubTree, rightSubTree);
  }

  // given a BT, return inverted BT.
  // O(N) since we are travelling through all nodes | O(N) will have all leaf nodes in the queue. leaf nodes are approximately N/2
  invertBinaryTree(tree = this) {
    let queue = [tree];
    while (queue.length) {
      let current = queue.shift();
      if (!current) {
        continue;
      }
      [current.left, current.right] = [current.right, current.left];
      queue.push(current.left);
      queue.push(current.right);
    }
  }

  // another implementation using recursive approach
  // O(N) since we are travelling all tree-nodes | O(h) atmost will have h function calls where h is height (longest branch of the BT) (which is roughly N/2 for balanced Binary tree)
  invertBinaryTree(tree = this) {
    if (!tree) return; //base-case don't do anything
    [tree.left, tree.right] = [tree.right, tree.left];
    this.invertBinaryTree(tree.left);
    this.invertBinaryTree(tree.right);
  }

  // given a BT, find its diameter. A diameter of BT is the length of the longest path in the tree. Longest means starting at one node and ending at another nodes. Length is measured by edges.
  // depth first traversal will help us here.
  binaryTreeDiameter(tree = this) {
    return this.getTreeInfo(tree).diameter;
  }

  getTreeInfo(tree) {
    if (!tree) return { diameter: 0, height: 0 };
    let leftTreeData = this.getTreeInfo(tree.left);
    let rightTreeData = this.getTreeInfo(tree.right);

    let longestPathThroughRoot = leftTreeData.height + rightTreeData.height; //distance between leaf nodes via root
    let maxDiameterSoFar = Math.max(
      leftTreeData.diameter,
      rightTreeData.diameter
    );
    let currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar); //currentDiameter is w.r.t root-node.
    let currentHeight = 1 + Math.max(leftTreeData.height, rightTreeData.height); //currentHeight is w.r.t to root-node
    return { diameter: currentDiameter, height: currentHeight };
  }

  // given a BT and a node, find its successor. A successor of a node which is traversed after the given node in in-order fashion. the given node is already present in the tree.
  findSucessor(node, tree = this) {
    let inOrderTraversalOrder = [];
    this.inOrderTraversal(inOrderTraversalOrder);
    for (let i = 0; i < inOrderTraversalOrder.length; i++) {
      let currentNode = inOrderTraversalOrder[i];
      if (currentNode != node) continue;
      if (i === inOrderTraversalOrder.length - 1) return null; //found the given node is the last node in in-order traversal. hence return null.
      return inOrderTraversalOrder[i] + 1;
    }
  }

  // for other implementation, look at FindBinaryTreeSuccessor.js
  findSucessor(node, tree = this) {}
}

let bst = new BST(10);
bst.insert(5).insert(15);
bst.insert(2).insert(5).insert(1);
bst.insert(13).insert(22).insert(14);
bst.insert(12);
// console.log(bst.findClosestValue(13));
// console.log(bst.branchSums());
// console.log(bst.nodeDepths());
// console.log(validateBST());
// let array = [];
// console.log(bst.inOrderTraversal(array));
// array = [];
// console.log(bst.preOrderTraversal(array));
// array = [];
// console.log(bst.postOrderTraversal(array));
// console.log(bst.minHeightBST([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// console.log(bst.findKthLargestValueInBst(3));
// console.log(bst.reconstructBst([10, 5, 2, 1, 5, 15, 13, 12, 14, 22]));
// console.log(bst.invertBinaryTree());
// console.log(bst.binaryTreeDiameter());
// console.log(bst.findSucessor({ value: 14, left: null, right: null }));
