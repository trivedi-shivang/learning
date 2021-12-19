import LinkedList from '../LinkedList/LinkedList';

export default class Queue {
    constructor() {
        this.LinkedList = new LinkedList();
    }

    isEmpty() {
        return !this.LinkedList.head;
    }

    /**
     * read the element at the front of the queue without removing it
     * Time Complexity: O(1)
     */
    peek() {
        if(this.isEmpty()){
            return null;
        }
        return this.LinkedList.head.value;
    }

    /**
     * add a new element to the end of the queue (the tail of the linked list).
     * The element will be procesed after all elements ahead of it.
     * Time Complexity: O(1)
     */
    enqueue(value) {
        this.LinkedList.append(value);
    }

    /** remove the element at the front of the queue(the head of the linked list).
     * If the queue is empty, return null
     * Time Complexity: O(1)
     */ 
    dequeue() {
        const removeHead = this.LinkedList.deleteHead();
        return removeHead ? removeHead.value : null;
    }

    toString(callback) {
        return this.LinkedList.toString(callback);
    }
}