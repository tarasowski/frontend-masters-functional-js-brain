# Pure Functions

* Slides
* https://docs.google.com/presentation/d/1nj5xmsHeJh-6RdjLs1190Hwl8smclvFLePqPCTVsrYw/edit#slide=id.g6b2d04b72e_0_4

1) Total: for every input there is a corresponding output
2) Deterministic: If you give input you always receive the same output
3) No observable side-effects: no observable effects besides computing a value

```js
const add = (x, y) => {
i return {result: x + y, log: `Adding ${x} ${y}`}
}
```

* A function has input (parameters) and a range (output)

* Why to use functional programming?
  * Reliable
  * Portable
  * Reusable
  * Testable
  * Composalbe
  * Properties/Contract


* Properties

```js
// associative
add(add(x, y), z) == add (x, add(y, z))

// commutative
add(x, y) == add(y, c)

// identity
add(x, 0) == x

// distributive
add(multiply(x, y), multiply(x, z)) == multiply(x, add(y, z))
```

# Functional Architecture

* Architecture pays only if something grows in size
* Architecutre is subjective, it depends on the application and the product
* General Goal for web development, we can focus on the northstar
  * Modular
  * Extendable
  * Performant
  * Maintainable
  * Readable

* We have procedures (validate, filter, checkAge)
  * We goup them into classes or modules (class Person().validate | .filter | .checkAge)
* Procedures are just functions but not pure (just repeating some processes into
                                              a function)
* Remember the difference between procedures / functions

## Functions with defined contracts

* By investigating the functions type, and the type classes that holds specific
property implemented that a contract

* This is an example of encapsulation in functional programming 

```js

const identity = a => a

```

* Whats the value of identity

```js
const { Either } = require('types')

const identity = a => a

Either.of(2).fold(identity, identity)
```

> We want highly generalized functions. I'm just keep abstracting away, get
> information hiding.

* Favor composable functions, mostly
* Normalize effect types throughout the app
