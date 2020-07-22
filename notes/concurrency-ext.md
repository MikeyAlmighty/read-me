## The Laws of Programming with Concurrency

### Laws of programming
Collection of mathematical equations

Operating systems,
compilers,
program checker,
etc...

Sequential composition: p;q => Execution of p is followed by the execution of q
p u q is choice between p and q (only one of them are executed)
1 is executed by doing nothing and making no change


Laws of regular Algebra
-------------------------------------------------

 p;(q;r) => (p;q);r | ; associates and so does u 
 1;p => p == p;1   | 1 is the unit of ; (nothing followed by execution of p, is the lone execution of p)
 p u q = q u p     | u commutes                 
 p u p = p | u is idempotent (Choice of p or p is p) 
 p;(q u r) = p;q u p;r | ; distributes through u and leftward as well
-------------------|----------------------------

Refinement Ordering &#2264; :
