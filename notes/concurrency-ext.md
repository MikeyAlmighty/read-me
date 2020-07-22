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


### Laws of regular Algebra:

 p;(q;r) => (p;q);r | ; associates and so does u 
-------------------|----------------------------
 1;p => p == p;1   | 1 is the unit of ; (nothing followed by execution of p, is the lone execution of p)
-------------------|----------------------------
 p u q = q u p     | u commutes                 
-------------------|----------------------------
 p u p = p | u is idempotent (Choice of p or p is p) 
-------------------|----------------------------
 p;(q u r) = p;q u p;r | ; distributes through u and leftward as well
-------------------|----------------------------

### Refinement Ordering &leq; (below):

p &leq; q means every execution of p, is also an execution of q
so p is more determinate (stronger)
and q is more abstract (weaker)

Abstraction is a property of specification

If p is a program and r,s are specifications
	p &leq; r means p satisfies r
	r &leq; s means r implies s

The Algebra ignores the distinctions because the proofs are the same
for both specifications and programs


Defined algebraically in terms of the choice operator:
p &leq; q means p u q = q

Since p is contained in q (its union with q,leaves q unchanged becuase all the executions of p are already in q)
