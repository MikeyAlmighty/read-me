function Queue(){
  this.elements = []
}

Queue.prototype.enqueue = function(val){
  this.elements.push(val)
}

Queue.prototype.dequeue = function(){
  this.elements.shift()
}

Queue.prototype.peek = function(){
  return this.elements[0]
}

let q = new Queue();

q.enqueue(6)
q.enqueue(1)
q.enqueue(1)

console.log(q) // { elements: [2, 3, 4]} }
console.log(q.peek()) // 2
q.dequeue() // Remove 2 from elements
console.log(q.peek()) // 3
