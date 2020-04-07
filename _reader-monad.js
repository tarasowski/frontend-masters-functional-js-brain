const S = require('sanctuary')
const { List } = require('immutable-ext')

// Function modelling
// combine functions on different ways, function give no methods

const toUpper = x => x.toUpperCase()
const exclaim = x => x.concat('!')


// concating two functions
// map is composition on a function
// concat run both and combine the both results 
// open the box and concat what's inside
// reader monad
const Fn = run =>
  ({
    run,
    map: f => Fn(x => f(run(x))),
    chain: f => Fn(x => f(run(x)).run(x)),
    concat: other =>
      Fn(x => run(x).concat(other.run(x)))
  })

Fn.of = x => Fn(() => x)
Fn.ask = Fn(x => x)

console.log(
  // the basis for the reader monad
  // making a function into a monad we talk about nesting
  Fn(toUpper).concat(Fn(exclaim)).map(x => x.slice(3)).run('fp sucks'),
  Fn(toUpper).chain(upper => Fn(x => [upper, exclaim(x)])).run('hi'),
  Fn.of('hello')
    .map(toUpper)
    .chain(upper => Fn(config => [upper, config]))
    .run({port: 3000}),
  Fn.of('hello')
    .map(toUpper)
    .chain(upper =>
      Fn.ask.map(config => [upper, config])
    ).run({db: 'db.address', port: 3000})
)

// -----------------------------------------------

const Endo = run =>
  ({
    run,
    concat: other =>
      Endo(x => run(other.run(x)))
  })

Endo.empty = () => Endo(x => x)
// Endomorphism works with types from a to a
// now we can compose the same types because they always compose
//[toUpper, exclaim].foldMap(Endo, Endo.empty('')).run('hello') // HELLO!
console.log(
  List([toUpper, exclaim])
    .foldMap(Endo, Endo.empty(''))
    .run('hello')
)


// contravarian function are functors that operate only on the first value
// a -> String
// a -> Boolean (predicate functions)


// (acc, a) -> acc
const Reducer = run =>
  ({
    run,
    contramap: f =>
      Reducer((acc, x) => run(acc, f(x)))
  })


const checkCreds = (email, pass) =>
  email === 'admin' && pass === 123

const login = payload => state =>
  payload.email
    ? Object.assign({}, state, {loggedIn: checkCreds(payload.email, payload.pass)})
    : state

const setPrefs = payload => state =>
  payload.prefs
    ? Object.assign({}, state, {prefs: payload.prefs})
    : state 

const reducer = Fn(login).map(Endo).concat(Fn(setPrefs).map(Endo))


const state = {loggedIn: false, prefs: {}}
const payload = {email: 'admin', pass: 123, prefs: {bgColor: '#000'}}


console.log(
  reducer.run(payload).run(state)
)
