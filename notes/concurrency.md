Concurrency = Design Pattern

If you run a program that uses a concurrent design pattern on a single CPU,
that Code is NOT running in parallel.

Multiple CPUs on a machine running a program using the concurrent design pattern,
can run in parallel.

Concurrency = Composition of independently executing things (typically functions)
Parallelism = Simultaneous execution of multiple things (possibly related, possibly not)

Layman's Terms:
Concurrency = Dealing with a lot of things at once
Parallelism = Doing a lot of things at once

Concurrency => Hard to Debug, due to non-deterministic behaviour
			=> Depends mostly on OS's scheduler (not your code)
			
			Symptons: Race conditions

			Mutexes or locks used to solve Race condition, BUT
			that can cause deadlocks

			Hard to reproduce, hard to debug, hard to ensure reliability

			Few solutions:
					Semaphores, Mutexes and locks
					Atomic operations
					Compare & swap
					Synchronization

			These solutions have on weaknesses:
						1. Complex overhead
						2. Leaky
						3. Non-Composable


		    Wanted solution: 
						1. Simplicity
						2. Abstractions
						3. Composability
						4. Conccurent

Processes communicate with channels (pass pipes, texts,bytes even other channels)

GoLang Motto: Don't communicate by sharing memory,
SHARE memory by Communicating
