const { curry } = require('ramda')

const add = (x, y) => x + y

add([1,2])

const toPair = f => 
  ([x, y]) => f(x, y)

const fromPair = f =>
  (x, y) => f([x, y])

const res = fromPair(toPair(add))(1,2)

const flip = f =>
  (y, x) =>  f(x, y)

//const curry = f =>
//  x => y => f(x, y)
//

const curriedAdd = curry(add)

const increment = curriedAdd(1) 

console.log(increment(3))

const modulo = curry((x, y) => y % x)

const isOdd = modulo(2)

const result = isOdd(3)

console.log(result)

const filter = curry((f, xs) => xs.filter(f))

const getOdds = filter(isOdd)

const result2 = getOdds([1,2,3,4,5,6])

console.log(result2)

// data happens last
const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement))

// we are not mentioning data here
// we talking about pointfree, we don't talk about data
const replaceVowels = replace(/[AEIOU]/ig, '!')

// we decoupled the data from the functions
const result3 = replaceVowels('Hey I have words')

console.log(result3)
