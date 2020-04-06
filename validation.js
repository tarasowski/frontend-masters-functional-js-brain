const S  = require('sanctuary')

const Success = x =>
  ({
    isFail: false,
    x,
    fold: (f, g) => g(x),
    concat: other =>
      other.isFail ? other : Success(x)
  })

const Failure = x =>
  ({
    isFail: true,
    x,
    fold: (f, g) => f(x),
    concat: other =>
      other.isFail ? Failure(x.concat(other.x)) : Fail(x)
  })

const Validation = run => ({
  run,
  concat: other =>
    Validation((key, x) => run(key, x).concat(other.run(key, x)))
})

// !! converts object to a boolean if falsy returns false otherwise true
const isPresent = Validation((key, x) => !!x ? Success(x) : Failure([`${key} needs to be present`]))


const isEmail = Validation((key, x) => /@/.test(x) ? Success(x) : Failure([`${key} must be an email`]))

const validate = (spec, obj) =>
    S.foldMap (Array) 
              (key => spec[key].run(key, obj[key]))
              (Object.keys(spec))


//const validations = {name: isPresent, email: isPresent.concat(isEmail)}
//const obj = {name: 'dimitri', email: ''}

module.exports = {validate}
