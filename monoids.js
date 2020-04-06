// Semigroup -> implementat concat
// Monoid is a semigroup + Identity -> implements concat + identity

// accitiativity
// parallezable can be run on many parallel processes and combined back
// 1 + (2 + 6)
// (1 + 2) + 6
// 2 * (5 * 8)
// (2 * 5) * 8
// closed means if i combine arrays i will get the same data type back [] + [] we get []
// with devision we are not getting a closed type 10 / 4 / 2 -> we get float


const Sum = x => ({
  x, 
  concat: other => 
    Sum(x + other.x)
})

// identity
Sum.empty = () => Sum(0)


const Product = x => ({
  x, 
  concat: other => 
    Sum(x * other.x)
})

// identity
Product.empty = () => Product(1)

const Any = x => ({
  x, 
  concat: other => 
    Any(x || other.x)
})

Any.empty = () => Any(false)

const All = x => ({
  x, 
  concat: other => 
    Any(x && other.x)
})

All.empty = () => All(true)

// we are lifting the operation into an interface
const res = Sum(3).concat(Sum(5)) // Sum(8)
const res2 = Product(3).concat(Product(5))
const res3 = Any(false).concat(Any(false))
const res4 = 'hi'.concat('!')

console.log(res)
console.log(res2)
console.log(res3)
console.log(res4)
console.log(
  Product(1).concat(Product(10)),
  Product.empty().concat(Product(10)),
  Sum.empty().concat(Sum(10)),
  [1,2,3].map(Sum).reduce((acc, n) => acc.concat(n), Sum.empty())
)


const Id = x => 
  ({
    map: f => Id(f(x)),
    chain: f => f(x),
    extract: () => x,
    concat: o => Id(x.concat(o.extract()))
  })

Id.of = x => Id(x)


console.log(
  Id.of(Sum(2)).concat(Id.of(Sum(3))).extract()
)
