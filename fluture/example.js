const { encaseP, node, encase, fork, chain, map} = require('fluture')
const { $, is, get, toUpper, head, fromMaybe, Left, Right, fromEither, prop } = require('sanctuary')
const fs = require('fs')


const readFileF = filePath => node(done => fs.readFile(filePath, 'utf-8', done))
const jsonParseF = encase(jsonString => JSON.parse(jsonString))
const nameF = encase(obj => obj.name)


readFileF('./test.json')
  .pipe(chain(jsonParseF))
  .pipe(chain(nameF))
  .pipe(fork(() => console.log('form an error')) (x => console.log('from success', x)))


const t = fromMaybe ('HELLO') (map (toUpper) (head(['Words'])))
console.log(t)


const first = Right('value')


const r = fromEither ('HELLO') (map (toUpper) (first))
console.log(r)

const p = prop ('a') ({a: 1, b: 2})
console.log(p)

const g = fromMaybe (10) (get (x => typeof x == 'number') ('x') ({x: 50, y: 2}))

console.log(g)






