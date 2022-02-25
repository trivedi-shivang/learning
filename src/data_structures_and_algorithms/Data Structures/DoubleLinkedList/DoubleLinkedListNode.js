export default class DoubleLinkedListNode {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }

    toString(callback){
        return callback ? callback(this.value) : `${this.value}`;
    }
}