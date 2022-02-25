function PriorityQueue() {
  this.collection = [];
  this.printCollection = function () {
    console.log(this.collection);
  };
  // Only change code below this line
  this.enqueue = function (arr) {
    this.collection.push(arr);
    let n = this.collection.length - 1;
    if (this.collection.length > 1) {
      for (let i = this.collection.length - 2; i >= 0; i--) {
        if (this.collection[i][1] < this.collection[n][1]) {
          let swap = this.collection[n];
          this.collection[n] = this.collection[i];
          this.collection[i] = swap;
        }
      }
    }
  };

  this.dequeue = function () {
    return this.collection.shift()[0];
  };

  this.front = function () {
    return this.collection[0][0];
  };

  this.size = function () {
    return this.collection.length;
  };

  this.isEmpty = function () {
    return this.collection.length === 0;
  };
  // Only change code above this line
}

let p = new PriorityQueue();
p.enqueue(["kitten", 1]);
p.enqueue(["dog", 2]);
