## TypeScript

Uses `.tsx`extension
`.tsconfig` - Configuration File [Example tsconfig](../tsconfig.example.md)

### Benefits

- Strong typing
- OOP Features
- Compile-time errors
- Great tooling

### JavaScript vs TypeScript

JavaScript dynamically typed (Resolved at runtime)
TypeScript statically typed (Set during Development)

### Types

``` typescript
number:  1, 5.3, -10
string:  'deadPool', "deadPool", `deadPool`
boolean: true, false
object: const person = { name: "Mikey", age: 25 }
string[]: String array
number[]: Number array
```

#### Tuple

When you need exactly "x" amount of values and know type of each value before hand then a Tuple can be used:

``` typescript
const person = {
  name: "Mikey",
  age: 25,
  role: [number, string] // Tuple first type number, second type string
}
```

#### Enum

Assigns Labels to numbers

``` typescript
enum Role { READ, WRITE, DELETE };
Role.READ
```

#### Union types

``` typescript
const combine = (input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number'){
    ...
  } else {
    ...
  }
}
```

#### Literal Types

Only 'Admin' or 'Write' is allowed

``` typescript
const deadPool = (role: 'Admin' | 'Write') => {
 ...
}
```

#### Type alias (Custom Type)

``` typescript
type Combinable = string | number;
```

###  Function Types and callbacks

``` typescript
const add = (n1: number, n2: number) => {
  
}
```

``` typescript
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2
  cb(result)
}

addAndHandle(10, 10, (result) => console.log(result))
```

### The "unknown" Type 

Rather use `unknown` than any where applicable.

(By letting the type be `unknown` we can just add a `typeof` string check to score extra type safety).

``` typescript
  let userInput: unknown;
  let userName: string;
  
  if (typeof userInput === 'string') {
    userName = userInput;
  }
```

### The "never" Type

Useful for functions that "never" return anything, i.e: functions that could `throw` an error:

``` typescript
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code }
   
}
```

### readonly

Set once during (and kept throught) initialization.
``` typescript
constructor(private readonly id: string, public name: string)
```

### Interfaces

``` typescript
interface Person {
  name: string;
  age: number;
  
  greet(phrase: string): void;
}

let user1: Person

user1 = {
  name = "Mikey";
  age = 25;
}
```

Interfaces describe the structure of an object.

#### Exporting interfaces:

`StringValidator.ts`
``` typescript
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
```
`ZipCodeValidator.ts`

``` typescript
import { StringValidator } from "./StringValidator";

export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

### Advanced Types
