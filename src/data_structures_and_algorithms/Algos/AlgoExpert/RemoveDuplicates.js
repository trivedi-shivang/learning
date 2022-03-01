class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  insert(value) {
    if (!this.head) {
      this.head = new Node(value);
      return;
    }
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(value);
  }

  // since the linked-list is sorted., two pointers will help me solve the problem.
  //   O(N) Time (not O(N^2) because the inner while loop never goes through the element which the outer while loop has already gone through) | O(1) Space

  removeDuplicates() {
    let currentNode = this.head;
    let nextDistinctNode;
    while (currentNode) {
      nextDistinctNode = currentNode.next;
      while (nextDistinctNode && nextDistinctNode.value === currentNode.value) {
        nextDistinctNode = nextDistinctNode.next;
      }
      currentNode.next = nextDistinctNode;
      currentNode = nextDistinctNode;
    }
    return this;
  }
}

let n = new Node();
n.insert(1);
n.insert(3);
n.insert(4);
n.insert(4);
n.insert(4);
n.insert(5);
n.insert(6);
n.insert(6);
console.log(n.removeDuplicates());
