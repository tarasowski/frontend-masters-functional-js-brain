const { Task } = require('../fp-arch-class/lib/types')
const { db, all, save } = require('../fp-arch-class/lib/db')
const { last } = require('ramda')

const AuthorTable = 'Authors'
const PostTable = 'Post'

// we created a type, a simple type that just returns the name back
// the reason for that is that keeps your data types defined, you're not just creating willy nilly data types all as you go 
const Author = name => ({name})
const Post = (title, body) => ({title, body})

const readline = require('readline').createInterface({input: process.stdin, output: process.stdout})

const getInput = (q) =>
  Task((rej, res) => readline.question(q, (i => res(i.trim()))))


getInput('sup?').map(answer => answer.toUpperCase())
//.fork(console.error, console.log)


const formatPost = post => `${post.title}:\n${post.body}`
const print = s => Task((rej, res) => res(console.log(s)))


const latest = () =>
  all(PostTable)
    .map(posts => last(posts))
    .map(formatPost)
    .chain(print)
    .map(() => menu)

const menu = () =>
  getInput('Where do you want to go today? (createAuthor, write, latest, all) ')
    .map(route => router[route])

const write = () =>
  getInput('Title: ')
    .chain(title => 
      getInput('Body: ')
      .map(body => Post(title, body)))
      .chain(post => save(PostTable, post))
      .map(() => latest)

const createAuthor = () =>
  getInput('Name? ')
    .map(name => Author(name))
    .chain(author => save(AuthorTable, author))
    .map(() => menu)

const router = {menu, createAuthor, write, latest}

const start = () => 
  all(AuthorTable)
   .map(author => author.length ? menu : createAuthor)

const runApp = f =>
  f().fork(console.error, runApp)

runApp(start)
