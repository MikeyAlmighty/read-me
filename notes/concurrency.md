## Concurrency

Concurrency = Design Pattern

If you run a program that uses a concurrent design pattern on a single CPU,
that Code is NOT running in parallel.

Multiple CPUs on a machine running a program using the concurrent design pattern,
can run in parallel.

| Concurrency | Parallelism |
--------------|-------------|
| Composition of independently executing things (typically functions) | Simultaneous execution of multiple things (possibly related, possibly not) |


### Layman's Terms:
* Concurrency = Dealing with a lot of things at once
* Parallelism = Doing a lot of things at once

* Hard to Debug, due to non-deterministic behaviour
* Depends mostly on OS's scheduler (not your own written code)
			
### Issues:
Race conditions

Mutexes or locks can be used to solve Race condition, BUT
that can cause deadlocks

Hard to reproduce, hard to debug, hard to ensure reliability

### Few solutions:
* Semaphores, Mutexes and locks
* Atomic operations
* Compare & swap
* Synchronization

### These solutions have own weaknesses:
* Complex overhead
* Leaky
* Non-Composable


### Wanted solution: 
* Simplicity
* Abstractions
* Composability
* Conccurent

Processes communicate with channels (which you can pass pipes, texts,bytes even other channels)

> Don't Communicate by Sharing Memory,  Share Memory by Communcating 
> GoLang 
