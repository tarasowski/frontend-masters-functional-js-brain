const {liftF} = require('../lib/free')
const {Id} = require('../lib/types')
const {taggedSum} = require('daggy')

// we have defined two data types Get and Post
// shorter sytnax for creating data types as objects
// ['arg'] -> inside array are the arguments for the data type
const Http = taggedSum('Http', {Get: ['url'], Post: ['url', 'body']})

// liftF lifts a modan into a free modan

// url -> Free(Http.Get) 
const httpGet = (url) => liftF(Http.Get(url))

// url -> Free(Http.Post)
const httpPost = (url, body) => liftF(Http.Post(url, body))

// Free monad are just data, we can chain and compose and whatever we want
const app = () =>
  httpGet('/home')
  .chain(contents => httpPost('/analytics', contents))

const interpret = x =>
  x.cata({
    Get: url => Id.of(`contents for ${url}`),
    Post: (url, body) => Id.of(`posted ${body} to ${url}`)
  })

// Id.of is for stubbing out instead of Task
const res = app().foldMap(interpret, Id.of)
console.log(res.extract())


//-------------------- my checks ---------------
const r = Http.Get('/home').cata({
  Get: url => 'Im calling get',
  Post: (url, body) => 'Im calling post'
})

console.log(r)

console.log(
  Http.Post('/submit', 'hello world')
)


