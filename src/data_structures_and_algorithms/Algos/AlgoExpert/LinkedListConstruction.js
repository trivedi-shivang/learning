// It comprises of nodes. Nodes can be integer, string or anything else.
// Singly linked-list will only point to the next node. Doubly linked-list nodes point both to previous and next nodes.
// End of the linked-list is called HEAD and other is called TAIL

// FUNCDTIONALITIES:
// Accessing a node
// Removing a node
// Remove all nodes in the linked list that are of a specific value.
// Insertion of node: before or after a node.Insertion of a node at a given position.
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  //   O(n) time | O(1) Space
  containsNodeWthValue(value) {
    let currentNode = this.head;
    while (currentNode && currentNode.value != value) {
      currentNode = currentNode.next;
    }
    return currentNode ? true : false;
  }

  //   O(1) | O(1)
  remove(node) {
    if (node === this.head) {
      this.head = this.head.next;
    }
    if (node === this.tail) {
      this.tail = this.tail.prev;
    }
    // IMPORTANT operations to happen in order to avoid resetting currentNode's prev and next before updating prev and next nodes to point each other.
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = node.prev = null;
  }

  //this may remove more than one node with matching value. Thus, temp variable declaration and assignment is necessary to remove all matching nodes.
  //   O(n) |O(1)
  removeNodesWithValue(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        let temp = currentNode.next;
        this.remove(currentNode);
        currentNode = temp;
      }
      currentNode = currentNode.next;
    }
  }

  //   removing an existing "nodeToInsert" from the linked list and placing that node before "node"
  //   O(1) | O(1)
  insertBefore(node, nodeToInsert) {
    //   possibility of inserting the node which already exists and is the only node.
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;
    if (!node.prev) {
      this.head = nodeToInsert;
    } else {
      nodeToInsert.prev.next = nodeToInsert;
    }
    // IMPORTANT node.prev can be reset after it's values are used few lines above.
    node.prev = nodeToInsert;
  }

  //   removing an existing "nodeToInsert" from the linked list and placing that node after "node"
  //   O(1) | O(1)
  insertAfter(node, nodeToInsert) {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.next = node.next;
    nodeToInsert.prev = node;
    if (!node.next) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }
    node.next = nodeToInsert;
  }

  //   O(1) | O(1)
  setHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    } else {
      this.insertBefore(this.head, node);
    }
  }

  //   O(1) | O(1)
  setTail(node) {
    if (!this.tail) {
      this.setHead(node);
      return;
    } else {
      this.insertAfter(this.tail, node);
    }
  }

  //   O(p) | O(1)
  insertAtPosition(position, nodeToInsert) {
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }
    let currentNode = this.head;
    let currentPosition = 1;
    while (currentNode && currentPosition != position) {
      currentNode = currentNode.next;
      currentPosition += 1;
    }
    if (currentNode) {
      this.insertBefore(currentNode, nodeToInsert);
      return;
    }
    this.setTail(nodeToInsert);
  }
}
