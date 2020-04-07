const {Task} = require('ramda-x')
const {encaseP, encase, node, fork, pipe } = require('fluture')
const fs = require('fs')

// https://write.as/nadeesha/from-promises-to-futures-in-javascript

// ============ clean part ===================
// no side-effects, nothing is running here
const t1 = v => Task.of(v)
            .map(two => two + 1)
            .map(three => three * 2)

const t2 = Task((rej, res) => res(2))
              .chain(two => Task.of(two + 1))
              .map(three => three * 2)


// ================ dirty part =====================
t1(2).fork(console.error, console.log)
t2.fork(console.error, console.log)


// =============== example with fluture ===============


const readFile = filePath => 
  node(done => fs.readFile(filePath, 'utf-8', done))



readFile('./LICENSE')
 // .pipe( fork (console.error) (console.log) )

// this is how fork works that's why we use .pipe inside the future
//fork (console.error) (console.log) (readFile('./LICENSE'))

// implementation for mini store
const store = x => ({
  update: f => store(f(x)),
  subscribe: f => f(x) 
})

const value = store('B')

const onSuccess = x => 
  value.update(v => v + x + 'W').subscribe(x => console.log(x)) 

fork (() => 'TK: no such file') (x => onSuccess(x[0])) (readFile('./LICENSE'))




