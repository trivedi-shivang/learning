class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
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

  contains(value) {
    let currentNode = this;
    while (currentNode) {
      if (currentNode.value === value) return "found";
      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return "not found";
  }

  getMinValue(node) {
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  remove(value, currentNode = this, parentNode = null) {
    while (true) {
      if (currentNode.value > value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        if (currentNode.left && currentNode.right) {
          // replace the currentNode's value with min-value in right-sub-tree and remove that min-value's node
          currentNode.value = this.getMinValue(currentNode.right);
          this.remove(currentNode.value, currentNode.right, currentNode);
        } else if (parentNode.left === currentNode) {
          parentNode.left = currentNode.left || currentNode.right;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left || currentNode.right;
        } else if (!parentNode) {
          // this condition is also true for the above the edge case but since we don't do anything with parentnode in that edge case, we are writing a separate logic
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
        }
        break;
      }
    }
  }

  // iterative
  closest(value) {
    let currentNode = this;
    let closest = Infinity;
    while (currentNode) {
      if (Math.abs(value - closest) > Math.abs(currentNode.value - value)) {
        closest = currentNode.value;
      }
      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else {
        return value;
      }
    }
    return closest;
  }

  // recursive
  closest(target, currentNode = this, closest = Infinity) {
    if (!currentNode) return closest; //base case for null Node
    if (Math.abs(currentNode.value - target) < Math.abs(closest - target)) {
      closest = currentNode.value; //update when found smaller value
    }
    if (currentNode.value < target) {
      //explore only right tree
      return this.closest(target, currentNode.right, closest);
    } else if (currentNode.value > target) {
      //explore only left tree
      return this.closest(target, currentNode.left, closest);
    } else return closest;
  }

  // recursive solution
  branchSums(arr, sum = 0, currentNode = this) {
    this.calculateBranchSums(currentNode, sum, arr);
    return arr;
  }

  calculateBranchSums(currentNode, sum, arr) {
    sum += currentNode.value;
    if (currentNode.left) {
      this.calculateBranchSums(currentNode.left, sum, arr);
    }
    if (currentNode.right) {
      this.calculateBranchSums(currentNode.right, sum, arr);
    }
    if (!currentNode.left && !currentNode.right) {
      arr.push(sum);
    }
  }

  // iterative solution
  // start at root node. push it in a stack.
  // pop in a while loop. compute new runningSum by combining oldrunningsum with node's value
  // O(N) Time/Space
  branchSums() {
    let sums = [];
    let runningSum = 0;
    if (!this) return;
    let nodesToExplore = [{ node: this, sum: runningSum }];
    while (nodesToExplore.length) {
      const { node, sum } = nodesToExplore.pop();
      let newRunningSum = sum + node.value;
      if (node.right) {
        nodesToExplore.push({ node: node.right, sum: newRunningSum });
      }
      if (node.left) {
        nodesToExplore.push({ node: node.left, sum: newRunningSum });
      }
      if (!node.left && !node.right) {
        sums.push(newRunningSum);
      }
    }
    return sums;
  }

  // recursive
  nodeDepthsSum() {
    return this.calculateNodeDepthsSum();
  }

  // recursive
  // calculateNodeDepthsSum(currentNode = this, sum=0, depth=0){
  //     if(!currentNode) return;
  //     sum += depth;
  //     if(currentNode.left){
  //         sum = this.calculateNodeDepthsSum(currentNode.left, sum, depth+1);
  //     }
  //     if(currentNode.right){
  //         sum = this.calculateNodeDepthsSum(currentNode.right, sum, depth+1);
  //     }
  //     if(!currentNode.left && !currentNode.right){
  //         return;
  //     }
  //     return sum;
  // }

  // iterative
  // calculateNodeDepthsSum(){
  //     let nodesToExplore = [{node: this, depth: 0}];
  //     let sum = 0;
  //     while(nodesToExplore.length){
  //         let {node, depth} = nodesToExplore.pop();
  //         sum += depth;
  //         if(node.left){
  //             nodesToExplore.push({node: node.left, depth: depth+1});
  //         }if(node.right){
  //             nodesToExplore.push({node: node.right, depth: depth+1});
  //         }
  //     }
  //     return sum;
  // }

  // recursively but combining both left and right depths using the following formula
  // O(N) where N is total number of nodes | O(h) height of the BST or maximum depth. If BST is linear, O(n) will be space
  calculateNodeDepthsSum(currentNode = this, depth = 0) {
    let sum = depth;
    if (currentNode.left) {
      sum += this.calculateNodeDepthsSum(currentNode.left, depth + 1);
    }
    if (currentNode.right) {
      sum += this.calculateNodeDepthsSum(currentNode.right, depth + 1);
    }
    return sum;
  }

  getMinNodeValue(currentNode, parentNode) {
    if (!parentNode || parentNode.left === currentNode) return -Infinity;
    else parentNode.value;
  }
  getMaxNodeValue(currentNode, parentNode) {
    if (!parentNode || parentNode.right === currentNode) return Infinity;
    else parentNode.value;
  }

  // O(N) Time | O(d) space (number of maximum function calls in call-stack which is equal to maximum depth of a branch in BST). If tree is linear then O(N) space
  validateBSTHelper(tree, minValue, maxValue) {
    if (!tree) return true;
    if (maxValue <= tree.value || minValue > tree.value) return false; //this condition is necessary to validate a tree as a BST.
    return (
      this.validateBSTHelper(tree.left, minValue, tree.value) && //exploring left sub-tree will have to be upper-bounded by tree.value
      this.validateBSTHelper(tree.left, tree.value, maxValue)
    );
  }

  validateBST(currentNode = this) {
    // for root node min will be -Inf and max will be Inf
    return this.validateBSTHelper(currentNode, -Infinity, Infinity);
  }

  // inOrderTraversalHelper(result, currentNode = this) {
  //   if (!currentNode) return;
  //   this.inOrderTraversalHelper(result, currentNode.left);
  //   result.push(currentNode.value);
  //   this.inOrderTraversalHelper(result, currentNode.right);
  // }

  // // O(N) time | O(N +d) (where is N is result size and d is depth of BST or number of function call-stacks at a time)
  // inOrderTraversal() {
  //   let result = [];
  //   this.inOrderTraversalHelper(result);
  //   return result;
  // }

  inOrderTraversal(result, tree = this) {
    if (!tree) return; //this return won't return from the function on leaf node. This is imp if you want to have one instead of two functions (inOrderTraversal and inOrderTraversalHelper).
    this.inOrderTraversal(result, tree.left);
    result.push(tree.value);
    this.inOrderTraversal(result, tree.right);
  }

  preOrderTraversalHelper(result, currentNode = this) {
    if (!currentNode) return;
    result.push(currentNode.value);
    this.preOrderTraversalHelper(result, currentNode.left);
    this.preOrderTraversalHelper(result, currentNode.right);
  }

  // O(N) time | O(n +d) (where is n is result size and d is depth of BST or number of function call-stacks at a time)
  preOrderTraversal() {
    let result = [];
    this.preOrderTraversalHelper(result);
    return result;
  }

  postOrderTraversalHelper(result, currentNode = this) {
    if (!currentNode) return;
    this.postOrderTraversalHelper(result, currentNode.left);
    this.postOrderTraversalHelper(result, currentNode.right);
    result.push(currentNode.value);
  }

  // O(N) time | O(n +d) (where is n is result size and d is depth of BST or number of function call-stacks at a time)
  postOrderTraversal() {
    let result = [];
    this.postOrderTraversalHelper(result);
    return result;
  }

  // given a sorted array of distinct integers. construct a BST from the array and return the root node value. Also, return the min height of the BST (height of a BST is the maximum length/depth of a BST)
  // min height of BST can be minimized by having same number of items in left subtree as in right subtree. This can be done easily if we were to construct BT(Binary Tree - having atmost any two nodes for a node). But, we are suppose to create BST (those two nodes of BT has to satisfy the property where left subtree should have values strictly less than root node and right subtree should have values greater than equal to root node)
  // distinct values in the array helps to find the middle element to be the root node of BST.

  // every element is inserted w.r.t to root node (bst.insert(....)). Assuming there are n elements to be inserted into BST and since searching for the right place to insert that element takes logN. Total time will be O(nlogn) | O(d)
  // naive approach
  // constructMinHeightBST(arr, bst, startIdx, endIdx) {
  //   if (endIdx < startIdx) return;
  //   let midIdx = Math.floor((startIdx + endIdx) / 2);
  //   let valueToAdd = arr[midIdx];
  //   if (!bst) {
  //     bst = new BST(valueToAdd); //this is where it will create root-node
  //   } else {
  //     bst.insert(valueToAdd); //insertion happens by comparing valueToAdd to the root node's value.
  //   }
  //   this.constructMinHeightBST(arr, bst, startIdx, midIdx - 1); //because we already inserted middle element above in BST and need to only insert elements to the left
  //   this.constructMinHeightBST(arr, bst, midIdx + 1, endIdx);
  //   return bst;
  // }

  // O(N) Time | O(N)
  // constructMinHeightBST(arr, bst, startIdx, endIdx) {
  //   if (endIdx < startIdx) return;
  //   let middleIdx = Math.floor((startIdx + endIdx) / 2);
  //   valueToAdd = arr[middleIdx];
  //   if (!bst) {
  //     bst = new BST(valueToAdd);
  //   } else {
  //     if (valueToAdd < bst.value) {
  //       bst.left = new BST(valueToAdd); //any new values on left of valueToAdd will be smaller than valueToAdd and values on right of valueToAdd will be larger. Thus, "bst" will act as a reference point.
  //       bst = bst.left;
  //     } else {
  //       bst.right = new BST(valueToAdd);
  //       bst = bst.right;
  //     }
  //   }
  //   this.constructMinHeightBST(arr, bst, startIdx, middleIdx - 1);
  //   this.constructMinHeightBST(arr, bst, middleIdx + 1, endIdx);
  //   return bst;
  // }

  // minHeightBST(arr) {
  //   return this.constructMinHeightBST(arr, null, 0, arr.length - 1);
  // }

  // same approach as previous but not passing "bst" as argument/parameter.
  constructMinHeightBST(arr, startIdx, endIdx) {
    if (endIdx < startIdx) return null;
    let midIdx = Math.floor((startIdx + endIdx) / 2);
    let bst = new BST(arr[midIdx]);
    bst.left = this.constructMinHeightBST(arr, startIdx, midIdx - 1);
    bst.right = this.constructMinHeightBST(arr, midIdx + 1, endIdx);
    return bst; // returned on leaf nodes as well for final node
  }

  minHeightBST(arr) {
    return this.constructMinHeightBST(arr, 0, arr.length - 1);
  }

  // given root node of the BST and a positive non-zero integer k. find the kth largest value in BST. (k<=N where N is number of nodes in the BST)
  // for Ex: with given BST below, third largest value will be 14, first largest value will be 22, second largest value will be 15

  // naive approach O(N) Time (visiting all nodes once) | O(N) (storing N nodes' value in result + d (d<=n) depth of max height of a branch in the BST).
  kthLargestValueInBST(k) {
    // perform in-order traversal, find kth largest node from the end.
    let result = [];
    this.inOrderTraversal(result);
    return result[result.length - k];
  }

  treeInfo = {
    numberOfNodesVisited: 0,
    latestVisitedNodeValue: null,
  };

  // O(h+k) Time (h nodes to traverse of longest branch (height h) in BST + k elements from to be visited to find kth node) | O(h) Space complexity (h function calls recursively in call-stack)
  kthLargestValueInBST(k) {
    this.reverseInOrderTraverse(this, k, treeInfo);
    return this.treeInfo.latestVisitedNodeValue;
  }

  reverseInOrderTraverse(node, k) {
    if (!node || this.treeInfo.numberOfNodesVisited == k) return;
    this.reverseInOrderTraverse(node.right, k);
    if (this.treeInfo.numberOfNodesVisited < k) {
      this.treeInfo.numberOfNodesVisited += 1;
      this.treeInfo.latestVisitedNodeValue = node.value;
      this.reverseInOrderTraverse(node.left, k);
    }
  }

  // given an input array of integers. Return rootnode of the binary search tree whose preordertraversal array matches the input array.
  // Note: if the input array has not been ran on a BST but on BT then we cannot come up with the exact BST matching the input-array.
  // O(N^2) Time (for loop runs for possible all values and there is a recursive call for each "preOrdertraversalvalues" value)| O(N) (height of the longest branch in BST but becomes O(n) when BST is constructor linear + space to construct the BST)
  // reconstructBST(preOrderTraversalValues) {
  //   if (preOrderTraversalValues.length === 0) return null;
  //   currentValue = preOrderTraversalValues[0]; //this is the root-node in BST
  //   rightSubtreeRootIdx = preOrderTraversalValues.length; //this index is out of bounds. So, if rootnode's right-child does not exists then rightsubtree below will be empty
  //   for (let i in preOrderTraversalValues) {
  //     if (preOrderTraversalValues[i] >= currentValue) { // '=' for values which are equal to root-node's value
  //       // found the right child of the rootnode
  //       rightSubtreeRootIdx = idx;
  //       break;
  //     }
  //   }
  //   // since the input is preordertraversal, the left child node of the rootnode (if any) can be found after rootnode but before right-child
  //   leftSubtree = this.reconstructBST(
  //     preOrderTraversalValues.slice(1, rightSubtreeRootIdx)
  //   );
  //   rightSubtree = this.reconstructBST(
  //     preOrderTraversalValues.slice(rightSubtreeRootIdx)
  //   );
  //   return BST(currentValue, leftSubtree, rightSubtree);
  // }

  treeInfo = {
    rootIdx: 0,
  };
  reconstructBST(preOrderTraversalValues) {
    return this.reconstructBSTFromRange(
      -Infinity,
      Infinity,
      preOrderTraversalValues
    );
  }

  reconstructBSTFromRange(lowerBound, upperBound, preOrderTraversalValues) {
    // base cases
    if (this.treeInfo.rootIdx === preOrderTraversalValues.length) return null;
    let rootValue = preOrderTraversalValues[this.treeInfo.rootIdx];
    if (rootValue < lowerBound || rootValue >= upperBound) return null; //applicable for leaf nodes
    this.treeInfo.rootIdx += 1;
    let leftSubtree = this.reconstructBSTFromRange(
      lowerBound,
      rootValue,
      preOrderTraversalValues,
      this.treeInfo
    );
    let rightSubtree = this.reconstructBSTFromRange(
      rootValue,
      upperBound,
      preOrderTraversalValues,
      this.treeInfo
    );
    return new BST(rootValue, leftSubtree, rightSubtree);
  }

  // given a BST, return an inverted BST

  // iterative solution
  // O(N) Time | O(n) space (queue will once have all leaf nodes and they are approx N/2 in a balanced binary tree )
  // invertBinaryTree() {
  //   let queue = [this];
  //   while (queue.length) {
  //     let currentNode = queue.shift();
  //     let temp = currentNode.right;
  //     currentNode.right = currentNode.left;
  //     currentNode.left = temp;
  //     if (currentNode.left) queue.push(currentNode.left);
  //     if (currentNode.right) queue.push(currentNode.right);
  //   }
  // }

  // recursive
  // O(N) Time | O(h) = O(n) where h is the height of the longest branch of BST but might be possible that the BST is linear hence O(N)
  invertBinaryTree(currentNode = this) {
    if (!currentNode) return;
    let temp = currentNode.left;
    currentNode.left = currentNode.right;
    currentNode.right = temp;
    this.invertBinaryTree(currentNode.left);
    this.invertBinaryTree(currentNode.right);
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
// console.log(bst.calculateNodeDepthsSum());

// let invalidBST = {
//   value: 1,
//   left: {
//     value: 2,
//     left: null,
//     right: null,
//   },
//   right: {
//     value: 3,
//     left: null,
//     right: null,
//   },
// };
// // console.log(bst.validateBST(invalidBST)); //false
// console.log(bst.validateBST()); //true

// let result = [];
// bst.inOrderTraversal(result);
// console.log(result);
// console.log(bst.preOrderTraversal([]));
// console.log(bst.postOrderTraversal([]));

// console.log(bst.minHeightBST([1, 2, 5, 7, 10, 13, 14, 15, 22]));

// console.log(bst.kthLargestValueInBST(3)); //14

// console.log(bst.reconstructBST([10, 4, 2, 1, 5, 17, 19, 18]));

// bst.invertBinaryTree();
// console.log(bst);
