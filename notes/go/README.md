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
