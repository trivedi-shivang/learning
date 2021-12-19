import DoubleLinkedListNode from "./DoubleLinkedListNode";
import Comparator from '../../utils/Comparator';

export default class DoubleLinkedList{
    constructor(compareFunction){
        this.compare = new Comparator(this.compareFunction);
        this.head = null;
        this.tail = null;
    }

    // assuming a node already exists
    prepend(value) {
        const newNode = new DoubleLinkedListNode(value, this.head);
        if(this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        if(!this.tail){
            this.tail = newNode;
        }
        return this;
    }

    append(value){
        const newNode = new DoubleLinkedListNode(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        return this;
    }

    delete(value){
        if(!this.head){
            return null;
        }
        let deleteNode = null;
        let currentNode = this.head;
        while(currentNode){
            if(this.compare.equal(value, currentNode.value)){
                deleteNode = currentNode;
                if(deleteNode === this.head) {
                    this.head = this.head.next;
                    this.head?.prev = null;
                }

                else if(deleteNode === this.tail){
                    this.tail = this.tail.prev;
                    this.tail?.next = null;
                }

                else {
                    const prevNode = currentNode.prev;
                    const nextNode = currentNode.next;
                    prevNode.next = nextNode;
                    nextNode.prev = prevNode;
                }
                currentNode = currentNode.next;
            }
            return deleteNode;
        }
    }

    find({value = undefined, callback = undefined}) {
        if(!this.head) {
            return null;
        }
        let currentNode = this.head;
        while(currentNode) {
            if(callback && callback(currentNode.value)) {
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
        if(!this.tail){
            return null;
        }
        let deletedNode = this.tail;
        //if one node only
        if(this.tail === this.head){
            this.tail
        }
        if(this.tail.prev) {
            this.tail = this.tail.prev;
        }
        this.tail.next = null;
        return deletedNode;
    }

    deleteHead(){
        if(!this.head) {
            return null;
        }
        let deletedHead = this.head;
        //only a node exist
        if(deletedHead === this.tail) {
            this.tail = this.head = null;
        }else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return deletedHead;
    }

    toArray(){
        const nodes = [];
        let currentNode = this.head;
        while(currentNode){
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    fromArray(values){
        values.forEach(value => this.append(value));
        return this;
    }

    toString(callback){
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    reverse() {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;
        while(currentNode){
            nextNode = currentNode.next;
            prevNode = currentNode.prev;
            currentNode.next = prevNode;
            currentNode.prev = nextNode;
            prevNode = currentNode;
            currentNode = nextNode;
        }
    }
}