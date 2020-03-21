const {compose} = require('ramda')

//const compose = (f, g) => x => f(g(x))

const toUpper = str => str.toUpperCase()

const exclaim = str => str + '!'

const first = xs => xs[0]

const log = tag => x => (console.log(tag, x), x)
// const log = tag => x => console.log(tag, x) || x

// pipeline
const loudFirst = compose(toUpper, first)

const shout = compose(log('end'), exclaim, loudFirst)

const word = shout('Hello World')

// currying and composition play nice together

