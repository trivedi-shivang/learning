import Comparator from '../../utils/Comparator.js';

export default class Sort {
    constructor(originalCallbacks){
        this.callbacks = Sort.initialSortingCallbacks(originalCallbacks);
        this.comparator = new Comparator(this.callbacks.compareCallback);
        
    }
}