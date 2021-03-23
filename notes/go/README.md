## Variables

Variables are defined with the `var` keyword and two pieces of information: 
`the name `that we will use to refer to them and `the type of data` stored in the variable.
Since variables can be updated `we don’t even need to assign a value initially.`

Example:

``` go
var enemiesKilled uint16 // Unsigned Integer 16 bits
var isEnemyDead bool // Boolean
var accuracy float32 // 32-bit float
```

Variables need to be used (`err: declared and not used`).


Variables can be assigned like so:

``` go
var headShots uint16
headShots = 15
```
or
``` go
var headShots uint16 = 15
```

Strings:

``` go
var userName string = "Darkness"
```

Default zero values:

``` go
var enemiesKilled uint32 // 0
var userName string // ""
var accuracy float32 // 0.0
var isEnemyDead bool // false
```

#### Inferring Types

``` go
matchType := "Domination" // String type inferred
isRoundOver := false // Boolean type inferred
accuracy := 0.0 // defaults to float64
```
or
``` go
var matchType = "Domination" // String type inferred
var isRoundOver = false // Boolean type inferred
var accuracy = 0.0 // defaults to float64
```
By providing the type `int` or `uint`, 
Go will check to see if the computer architecture is running on is `32-bit `or `64-bit.` Then it will either provide a `32-bit int (or uint)`or a `64-bit`one depending on the computer itself.

It’s `recommended to use int` unless there’s a reason to specify the size of the int (like knowing that value will be larger than the default type, or needing to optimize the amount of space used).

``` go
var timesWeWereFooled int
var foolishGamesPlayed uint
```

Declaring an `int` like: 

``` go
enemiesKilled := 15 // same as declaring var enemiesKilled int
```

#### Multiple Variable Declaration

``` go
var part1, part2 string
part1 = "To be..."
part2 = "Not to be..."
```

or If we already know what values for variables should be:

``` go
quote, fact := 'Bears, Beets, BattleStar Galactica', true
```

#### Printf

``` go
luckyNumber :=  420 
fmt.Printf("Your number is:%v", luckyNumber)
```
`The %v portion is our placeholder and is known as a verb in Go. Verbs are identified by the combination of a % character followed by a letter.`

**General Verbs:**

``` go

%v	the value in a default format.
	When printing structs, the plus flag (%+v) adds field names
%#v	a Go-syntax representation of the value
%T	a Go-syntax representation of the type of the value
%%	a literal percent sign; consumes no value

%d interpolate number into a string.
%f interpolate float into a string. (%.fx precision, x being any positive integer)
```


#### Conditionals

if
``` go
if (healthy) {
  fmt.Println("Work.")
}
if sick {
  fmt.Println("Stay home.")
}
```

if-else
``` go
if (healthy) {
  fmt.Println("Work.")
}
else sick {
  fmt.Println("Stay home.")
}
```

switch
``` go
day := "Tuesday"
switch day {
  case "Monday":
    fmt.Println("Monday is magnificent.")
  case "Tuesday":
    fmt.Println("Tuesday is terrific.")
  case "Wednesday":
    fmt.Println("Wednesday is wacky.")
  default:
    fmt.Println("We survived.")
}
```

Short Variable declaration
(Only available in function scope)

``` go
if age := 55; age >= 55 {
  fmt.Println("You are retiring!")
}
switch season := "spring"; season {
  case "spring":
    fmt.Println("Plant some bulbs.")
  case "summer":
    ...
}
```


#### Sprintln, Sprint and Sprintf

Returns a value that can be stored in a variable and then printed out, i.e:

``` go
name := "Wade"
surname := "Wilson"
identity := fmt.Sprintln(name,surname)
fmt.Print(identity)
```

#### Scan
User input

``` go
var movie string
fmt.Println("What is your favorite movie?")
fmt.Scan(&movie)
fmt.Printf("I also like ", movie)
```

fmt.Scan() expects addresses for arguments, hence the `&` 
