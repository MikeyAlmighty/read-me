## Rust

## Why?

Compiler acts as gatekeeper
Cargo - Dependedncy management system and Build Tool
Rustfmt - Consistent formatting

Rust’s greatest ambition is to eliminate the trade-offs that 
programmers have accepted for decades by providing safety and 
productivity, speed and ergonomics.

### Chapters

**30/12/2020**
- [1.1.Installation](https://doc.rust-lang.org/book/ch01-01-installation.html)
- [1.2 Hello World](https://doc.rust-lang.org/book/ch01-02-hello-world.html)
- [1.3 Hello Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

https://doc.rust-lang.org/book/ch01-01-installation.html

#### Main function
```
fn main(){

}
```

#### Imports
```
use std::io;
```

#### Variables and references
```
let foo = bar; // Variables are immutable by default
let mut baz = bar; // Declare mutable variable
```

`read_line` returns a `Result`

#### Result Type
Result = Enum
variants are `Ok` and `Err`
`Err` = Operation failed, along with how/why operation failed.
Result type has methods defined
An instance of `io:Result` has an `expect` method defined on the instance, if this is an `Err` value, program will crash and return value.
If the instance from `io:Result` is an `Ok` value, expect will take the return value of `Ok`.

If you don't call `expect`, the program will compile with a warning:
```
warning: unused `std::result::Result` that must be used
  --> src/main.rs:10:5
   |
10 |     io::stdin().read_line(&mut guess);
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: `#[warn(unused_must_use)]` on by default
   = note: this `Result` may be an `Err` variant, which should be handled
```
#### Placeholder
`println!('You guessed {}', guess)` // {} is a placeholder

```
let x = 5;
let y = 10;

println!("x = {} and y = {}", x, y); // x = 5 and y = 10 will be printed
```
