class Node {
  constructor(val)  {
    this.val = val,
    this.left = null,
    this.right = null
  }
}


const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
const d = new Node('d')
const e = new Node('e')
const f = new Node('f')

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;


// eg: a
//    / \
//   b   c
//  / \   \
// d   e   f

// class Node {
//   contructor(val)  {
//     this.val = vale
//     this.left = null
//     this.right = null
//   }
// }

// Iterative Solution
const depthFirstValues = (root) => {
 const stack = [root] // Stack array Push, array Pop
  const result = []
    if (!root) return []
// End of array, top of stack
  while(stack.length > 0) {
    const current = stack.pop()
    result.push(current.val)

    if (current.right) stack.push(current.right); // Order of these two if-statements:
    if (current.left) stack.push(current.left); // right-to-left or left-to-right
    // First one on the stack
  }
  return result
}

const res = depthFirstValues(a)
console.log(res)
