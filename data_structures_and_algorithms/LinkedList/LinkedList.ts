import Comparator from "../utility/Comparator";

class LinkedListNode {
    public value: string;
    public next: LinkedListNode;
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}

export default class LinkedList {
    private head: LinkedListNode;
    private tail: LinkedListNode;
    private compare: Comparator;
    constructor(comparatorFunction) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    // this.head is/isn't empty. In any case, this.head has to refer to the newNode
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if(!this.tail) {
            this.tail = newNode;
        }
        return this; 
    }
    
    // changing this.tail, if exists, to refer to the newNode
    append(value) {
        const newNode = new LinkedListNode(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    delete(value) {
        if(!this.head) {
            return null;
        }
        // if the head-node is to be deleted then it's next node should be the new headnode
        let deleteNode = null;
        while(this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        if(currentNode !== null){
            while(currentNode.next){
                if(this.compare.equal(currentNode.next.value, value)){
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }else {
                    currentNode = currentNode.next;
                }
            }
        }

        if(this.compare.equal(this.tail.value, value)){
            this.tail = currentNode;
        }

        return deleteNode;
    }

    find({value = undefined, callback = undefined}) {
        if(!this.head){
            return null;
        }

        let currentNode = this.head;
        while(currentNode) {
            if(callback && callback(currentNode.value)){
                return currentNode;
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)){
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    deleteTail() {
        if(!this.tail) {
            return null;
        }

        let currentNode = this.head;
        while(currentNode !== this.tail || currentNode.next !== this.tail) {
            currentNode = currentNode.next;
        }
        if(currentNode === this.tail) {
            currentNode.next = null;
            this.head.next = null;
        }
        currentNode.next = null;
        return this.tail;
    }

    deleteHead() {
        if(!this.head){
            return null;
        }

        if(this.head.next){
            this.head = this.head.next;
        }else {
            this.head = null;
            this.tail = null;
        }

        return this.head;
    }

    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return nodes;
    }


    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
}