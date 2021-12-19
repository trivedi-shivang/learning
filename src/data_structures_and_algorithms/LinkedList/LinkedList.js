import Comparator from '../../utils/Comparator';
import LinkedListNode from './LinkedListNode';

export default class LinkedList {
    constructor(comparatorFunction){
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        if(!this.tail) {
            this.tail = newNode;
        }
        return this;
    }

    append(value) {
        const newNode = new LinkedListNode(value);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    delete(value){
        if(!this.head){
            return null;
        }

        let deleteNode = null;
        if(this.compare.equal(value, this.head.value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        while(currentNode.next){
            if(this.compare.equal(value, currentNode.next.value)){
                deleteNode = currentNode.next.value;
                currentNode.next = currentNode.next.next;
            }else {
                currentNode = currentNode.next;
            }
        }

        if(this.compare.equal(value, this.tail.value)){
            currentNode = this.tail;
        }

        return deleteNode;
    }

    find({value = undefined, callback = undefined}){
        if(!this.head){
            return null;
        }

        let currentNode = this.head;
        while(currentNode){
            if(callback && callback(currentNode.value)){
                return currentNode;
            }
            if(value !== undefined && this.compare.equal(value, currentNode.value)){
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    deleteTail(){
        const deletedTail = this.tail;
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
            return deletedTail;
        }
        let currentNode = this.head;
        while(currentNode.next !== this.tail){
            currentNode = currentNode.next;
        }
        currentNode.next = null;
        this.tail = currentNode;
        return deletedTail;
    }

    deleteHead() {
        if(!this.head) {
            return null;
        }
        const deletedHead = this.head;
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        this.head = this.head.next;
        return deletedHead;
    }

    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }

    toArray() {
        const nodes = [];
        const currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    toString(callback){
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    reverse(){
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currentNode){
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            // move prevNode and currentNode nodes one step forward.
            prevNode = currentNode;
            currentNode = nextNode;
        }

        //reset head and tail
        this.tail = this.head;
        this.head = prevNode;
        return this;
    }
}