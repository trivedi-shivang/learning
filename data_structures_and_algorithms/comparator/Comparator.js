export default class Comparator {
    /**
     * Constructor
     * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's say may compare custom objects together.
     */
    constructor(compareFunction) {
        this.compare = this.compareFunction || Comparator.defaultCompareFunction;
    }

    /**
     * Default comparison function. It just assumes 'a' and 'b' are strings or numbers
     * @param {(string|number)} a
     * @param {(string|number)} b
     */
    static defaultCompareFunction(a, b) {
        if( a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    /**
     * Check if two variables are equal
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    equal(a, b){
        return this.compare(a, b) === 0;
    }

    /**
     * Check if 'a' is less than 'b'
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
     lessThan(a, b){
        return this.compare(a, b) === -1;
    }

    /**
     * Check if 'a' is greater than 'b'
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
     greaterThan(a, b){
        return this.compare(a, b) === 1;
    }

    /**
     * Check if 'a' is less than equal to 'b'
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
     lessThanEqual(a, b){
        return this.lessThan(a,b) || this.equal(a,b);
    }

    /**
     * Check if 'a' is greater than equal to 'b'
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
     greaterThanEqual(a, b){
        return this.greaterThan(a,b) || this.equal(a,b);
    }

    /**
     * Reverses the comparison order
     */
     lessThanEqual(a, b){
        const compareOriginal = this.compare;
        this.compare = (a,b) => compareOriginal(b, a);
    }
}