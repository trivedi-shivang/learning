class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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
          currentNode.value = this.getMinValue(currentNode.right);
          this.remove(currentNode.value, currentNode.right, currentNode);
        } else if (parentNode.left === currentNode) {
          parentNode.left = currentNode.left || currentNode.right;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left || currentNode.right;
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
        }
        break;
      }
    }
  }

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
console.log(bst.calculateNodeDepthsSum());
