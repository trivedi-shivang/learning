export default class Comparator {
    constructor(compareFunction){
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    static defaultCompareFunction(a, b) {
        if(a === b) {
            return 0;
        }
        a < b ? -1 : 1;
    }

    equal(a,b){
        return this.compare(a,b) === 0;
    }

    lessThan(a,b) {
        return this.compare(a,b) < 0;
    }

    greaterThan(a,b) {
        return this.compare(a,b) > 0;
    }

    lessThanOrEqual(a,b) {
        return this.compare(a,b) <= 0;
    }

    greaterThanOrEqual(a,b) {
        return this.compare(a,b) >= 0;
    }

    reverse(){
        const compareOriginal = this.compare;
        this.compare = (a,b) =>  compareOriginal(b,a);
    }

}