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

