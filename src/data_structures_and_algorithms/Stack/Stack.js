import LinkedList from '../LinkedList/LinkedList';

export default class Stack {
    constructor() {
        this.linkedList = new LinkedList();
    }

    isEmpty() {
        return !this.linkedList.tail;
    }

    /**
     * read the element at the end of the stack without removing it
     * Time Complexity: O(1)
     */
    peek() {
        if(this.isEmpty()){
            return null;
        }
        return this.linkedList.tail.value;
    }

    /**
     * add a new element to the end of the stack (the tail of the linked list).
     * The element will be procesed after all elements ahead of it.
     * Time Complexity: O(1)
     */
    push(value) {
        this.linkedList.append(value);
    }

    /** remove the element at the end of the stack(the tail of the linked list).
     * If the stack is empty, return null
     * Time Complexity: O(1)
     */ 
    pop() {
        const removeTail = this.linkedList.deleteTail();
        return removeTail ? removeTail.value : null;
    }

    toString(callback) {
        return this.linkedList.toString(callback);
    }
}