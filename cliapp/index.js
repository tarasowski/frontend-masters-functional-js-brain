const { Task, Id } = require('../fp-arch-class/lib/types')
const { db, all, save } = require('../fp-arch-class/lib/db')
const { liftF } = require('../fp-arch-class/lib/free')
const { last } = require('ramda')
const { taggedSum } = require('daggy')

// Type for console, the console is an side-effect
// we'll treat it as a data structure
const Console = taggedSum('Console', {Question: ['q'], Print: ['s']})
// we make a second type for Database, this is the second effect here
const Db = taggedSum('Db', { Save: ['table', 'record'], All: ['table', 'query']})

const AuthorTable = 'Authors'
const PostTable = 'Post'

// we created a type, a simple type that just returns the name back
// the reason for that is that keeps your data types defined, you're not just creating willy nilly data types all as you go 
const Author = name => ({name})
const Post = (title, body) => ({title, body})

const readline = require('readline').createInterface({input: process.stdin, output: process.stdout})

const writeOutput = s => Task((rej, res) => res(console.log(s)))
const getInput = (q) =>
  Task((rej, res) => readline.question(q, (i => res(i.trim()))))


getInput('sup?').map(answer => answer.toUpperCase())
//.fork(console.error, console.log)


const formatPost = post => `${post.title}:\n${post.body}`

// we use lift to make data types
const print = s => liftF(Console.Print(s))
const question = s => liftF(Console.Question(s))


const dbAll = (t, q) => liftF(Db.All(t, q))
const dbSave = (t, r) => liftF(Db.Save(t, r))

const latest = () =>
  dbAll(PostTable)
    .map(posts => last(posts))
    .map(formatPost)
    .chain(print)
    .map(() => menu)

const menu = () =>
  question('Where do you want to go today? (createAuthor, write, latest, all) ')
    .map(route => router[route])

const write = () =>
  question('Title: ')
    .chain(title => 
      question('Body: ')
      .map(body => Post(title, body)))
      .chain(post => dbSave(PostTable, post))
      .map(() => latest)

const createAuthor = () =>
  question('Name? ')
    .map(name => Author(name))
    .chain(author => dbSave(AuthorTable, author))
    .map(() => menu)

const router = {menu, createAuthor, write, latest}

const start = () => 
  dbAll(AuthorTable)
   .map(author => author.length ? menu : createAuthor)


const dbToTask = x =>
  x.cata({ Save: save, All: all })

const consoleToTask = x =>
  x.cata({ Question: getInput, Print: writeOutput })


const consoleToId = x =>
  x.cata({ 
    Question: q => Id.of(`anser to ${q}`), 
    Print: s => Id.of(`writing the string ${s}`) })

const dbToId = x =>
  x.cata({ 
    Save: (t, r) => Id.of(`saving to ${r} ${t}`), 
    All: (t, q) => Id.of(`getting ${q} from ${t}`) })

const interpret = x =>
  x.table
    ? dbToTask(x) : consoleToTask(x)

const interpretTest = x =>
  x.table
    ? dbToId(x) : consoleToId(x)

const runApp = f =>
  runApp(f().foldMap(interpretTest, Id.of)).extract()
  //f().foldMap(interpret, Task.of).fork(console.error, runApp)

runApp(start)
