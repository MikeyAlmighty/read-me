class LinkedList {
    constructor(){
        this.head = null // First element
        this.tail = null  // Last element
    }

    // Add to end of the List
    append(value){
        const newNode = {
            value,
            next: null
        }
        // Because we're appending to the end of the list,
        // the tail needs to point to the new Node that gets added. (new tail)
        
        // Check if their is a tail to append to.
        // if no tail exists, we can just set the tail to the new Node.
        if(this.tail){
            this.tail.next = newNode 
        }
        this.tail = newNode

        // If there is no Head, meaning appending to an empty list,
        // we set the head to the new Node.
        if(!this.head){
            this.head = newNode
        }
    }

    // Deleting a Node, effectively breaks the chain, and gets cleaned up 
    // by GC.
    // Need to replace where currNode's next value === the value to delete,
    // then update said currNode's next to point to the next node after deletion.
    // (Effectively skipping the "deleted" Node)
    delete(value){
        if(!this.head) return
        let currNode = this.head

        // If first value is one to delete
        while(this.head && this.head.value === value){
            this.head = this.head.next
        }

        while(currNode.next){
            if(currNode.next.value === value){
                currNode.next = currNode.next.next
            } else {
                currNode = currNode.next
            }
        }

        // Check if tail is value to delete, if so, set tail to curret Node
        if(this.tail.value === value){
            this.tail = currNode
        }
    }

    // Add Node to beginning of the List
    prepend(value){
        const newNode = {
            value,
            next: this.head
        }
        this.head = newNode
        
        // If we prepend to empty list, set Tail to newNode as well (only one Node in list)
        if(!this.tail){
            this.tail = newNode
        }
    }

    find(value){
       if(!this.head) return null
        let currNode = this.head

        while(currNode){
            if(currNode.value === value){
                return currNode
            }
            currNode = currNode.next
        }
        // If not found return
        return null
    }

    insertAfter(value, afterValue){
        const existingNode = this.find(afterValue)
        if(existingNode){
            const newNode = {value, next:existingNode.next}
            existingNode.next = newNode
        }
    }

    toArray(){
        const elements = []
        let currNode = this.head // Start at the Head before iteration

        while(currNode){
            elements.push(currNode)
            currNode = currNode.next
        }
        return elements
    }

}

const linkedList = new LinkedList()
linkedList.append(420)
linkedList.append('DeadPool')
linkedList.prepend(69.0)
linkedList.append('Darkness')
linkedList.append(true)

console.log(linkedList.toArray())

linkedList.delete('Darkness')

// console.log(linkedList.toArray())

linkedList.prepend('BatMan')

console.log(linkedList.toArray())
// console.log(linkedList.find('BatMan')) should return found node
// console.log(linkedList.find('BatMan123')) should return null
linkedList.insertAfter('l33t', 420)

console.log(linkedList.toArray())
