### Collections
No order

## Lists - (Types don't matter) 

## Arrays - (Same Type)

Accessing items in an Array happens in constant time where as insertion/deletion
happens in Linear time.

Most languages store the length of their Collections, so retrieving the length
happens in constant time.


## Linked Lists

- [Implementation](data-structures/impl/linked-lists.js)
Has a value, and a next property associated along with it
which points to the next value of an element.

Linked list insertion/deletion happens in constant time.
Accessing happens in linear time. (Needs to go through (from head to tail)
each element until required element is found).

## Stacks

(LIFO)
Push/Pop happens on the Top Element so these operations happen in Constant time.
You could use a linked list to implement a Stack.

## Queues

(FIFO)
Head and Tail
Enqueue - Adding element to tail
Dequeue - Remove Head element
Peek - look at Head Element

## Deques (Double ended queue)

Can Enqueue or Dequeue from either end (Head or Tail).

## Priority Queue

Assign a priority when you insert an element into a priority queue.
Dequeue removes element of the highest priority.

Ordered List of Data, Duplicates allowed = **Array**
Unordered List of Data, Duplicates not allowed = **Set**
Key value pairs of Unorderd Data = **Object**
Key value pairs of Ordered, iterable Data = **Map**

Objects vs Maps
Objects = can implement methods
Maps = focused on data storage (Easier data access)
