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

An `intersection type` combines **multiple types into one**.
A `union type` describes a value that can be **one of several** types.
Usage and notation are quite simple, the `&` symbol is used to build an **intersection** while the `|` symbol is for **union**.

#### Intersection Types

Allows us to combine two types (And merge it into one).

``` typescript
type Admin = {
  name: string;
  privelages: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee

// Must require both Admin and Employee fields (Merges into one)
const e1: ElevatedEmployee = {
  name: 'Mikey',
  privelages: ['create-server'],
  startDate: new Date()
}
```

Can be used with types other than objects as well:

``` typescript
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric
```

Intersection Types: Closely relate to interfaces using inheritance

#### Union Types

Either one or the other, not both (Union)

``` typescript
type Admin = {
  name: string;
  privelages: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Admin | Employee
```

``` typescript
### TypeGuarding
`typeof` is used only in JS land (Not TS).

Using `in`:
``` typescript
// emp: UnknownEmployee
  if("privelages" in emp) {
    ...
  }
```

Using `instanceof` if it's referring to Classes:
(Javascript understands `classes` but **not** `interfaces`, hence why we can't use `instanceof` when working with interfaces).

``` typescript
class Admin {
  name: string;
  privelages: string[];
}

class Employee {
  name: string;
  startDate: Date;
}

type UnkownEmployee = Admin | Employee


const e1: UnkownEmployee = {
  name: 'Mikey',
  privelages: ['admin'],
}

if (e1 instanceof Employee) {
  console.log(e1.startDate) //VALID
}

// console.log(e1.startDate); // INVALID
```

— Union types can hold any instance of its components but can’t use functions of one. It can only use properties defined in all its components.
— Intersection types can hold a subset of its components instances but can use functions of any of them.

### Discriminated Unions

Common property in each object that makes up our Union.
i.e. 'type':
Works with interfaces and classes.

We use the property that we know exists, to check which type of object we're working with.

``` typescript
interface Bird {
  type: 'Bird'; // Literal
  flyingSpeed: number;
}

interface Horse {
  type: 'Horse'; // Literal
  runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
  // NOT ALLOWED because not a class
  // if (animal instanceof Animal){

  // }

  switch(animal.type) {
      case 'Bird':
        console.log('Fyling Speed: ', animal.flyingSpeed)
        break;
      case 'Horse':
        console.log('Running Speed: ', animal.runningSpeed)
        break;
  }
}
```

Typescript supports us with nice intelli-sense based on which interface we're referring to.

(Useful Pattern when working with objects and Union Types!)

### Type Casting

Lets you explicitly tell typescript the type.
Typescript doesn't dive into HTML. (Hence why `x | null`)

``` typescript
const paragraph = document.querySelector('p'); // Type: HTMLParagraphElement | null
// const userInputElement = document.getElementById('user-input'); // Type: HTMLElement | null

// userInputElement.value = 'deadpool'; // INVALID because userInputElement could be of type null
//
//
const userInputElement = <HTMLInputElement>document.getElementById('user-input'); // Type: HTMLElement | null

userInputElement.value = 'deadpool'; // VALID

In React:
const userInputElement = document.getElementById('user-input')! as HTMLInputElement; // Type: HTMLElement | null

userInputElement.value = 'deadpool'; // VALID
```

`document.getElementById('user-input')!` The exclamation says we never expect the LHS to be null

### TypeScript Declaration Files
Special module that tells TypeScript we're only defining types:
(Does not get compiled to JS/ only used for development, provide more information about functions)

i.e. `typings.d.ts`

This process is error-prone/duplicative, enter: [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).
`DefinitelyTyped` is a community maintained repository for high quality TypeScript type definitions.
