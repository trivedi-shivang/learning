import LinkedList from '../LinkedList/LinkedList';
const defaultHashTableSize = 32;

export default class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
        this.keys = {};
    }

    // Time Complexity: O(1)
    hash(key) {
        const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => hashAccumulator += keySymbol.charCodeAt(0), 0);

        // Reduce hash number so it would fit hash table size.
        return hash % this.buckets.length; 
    }

    // O(N)
    set(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({callback: (nodeValue) => nodeValue.key === key})
        if(!node) {
            bucketLinkedList.append({key, value});
        }else {
            node.value.value = value;
        }
    }

    //O(N)
    delete(key) {
        const bucketLinkedList = this.buckets[this.keys[key]];
        delete this.keys[key];
        const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key});
        if(node) {
            bucketLinkedList.delete(node.value);
        }
    }

    // O(N)
    get(key) {
        const bucketLinkedList = this.buckets[this.keys[key]];
        const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key});
        return node ? node.value.value : undefined;
    }

    has(key) {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    getKeys() {
        return Object.keys(this.keys);
    }

    getValues() {
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray()
                .map(linkedListNode => linkedListNode.value.value);
            return values.concat(bucketValues);
        }, []);
    }
}