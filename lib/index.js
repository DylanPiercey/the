'use strict'

var isType = require('is-typeof')
var merge = require('./utils').merge
var ValidationError = require('./validationError')
var the = The.prototype
var not = Not.prototype

/**
 * @class The
 * @param {Object} meta - Meta data to attach to errors.
 */
function The (meta) {
  if (!(this instanceof The)) return new The(meta)
  this.not = new Not()
  this._meta = meta || {}
  this._tests = []
  this.not._ = this._ = this
}

/**
 * @private
 * @description
 * Prototype that holds all negated tests.
 */
function Not () {}

/**
 * @private
 * @description
 * Store metadata information about test.
 */
the._meta = null

/**
 * @private
 * @description
 * A collection of tester functions.
 */
the._tests = null

/**
 * @private
 * @description
 * Indicates if null values should be tested.
 */
the._required = true

/**
 * @alias #test
 * @description
 * Run all of the attached tests against a provided value.
 * ```javascript
 * The().string().test('') // -> true
 * The().string().test(1) // -> ValidationError
 * ```
 *
 * @param {Any} value - The value to test.
 * @return {(ValidationError|Boolean)}
 */
the.test = function (value) {
  var error = new ValidationError()
  var tests = this._tests

  if (value == null) {
    if (this._required) {
      error.add(merge({ type: 'required', value: value }, this._meta))
    }
  } else {
    for (var test, i = tests.length; i--;) {
      test = tests[i]
      try {
        if (test.call(error, value) !== true) throw new Error()
      } catch (_) {
        error.add(merge(test.config, { value: value }, this._meta))
      }
    }
  }

  return isType.empty(error.errors) || error.toError()
}

/**
 * @alias #assert
 * @description
 * Run all of the attached tests against a provided value and throws if any fail.
 * ```javascript
 * The().string().assert('') // -> true
 * The().string().assert(1) // -> throw ValidationError
 * ```
 *
 * @param {Any} value - The value to test.
 * @throw {ValidationError} All tests must pass on the value.
 * @return {Boolean}
 */
the.assert = function (value) {
  var result = this.test(value)
  if (result !== true) throw result
  return true
}

/**
 * @alias #not
 * @description
 * Stores negated versions of all tests.
 * ```javascript
 * The().not.string().test(1) // -> true
 * The().not.string().test('1') // -> ValidationError
 * ```
 */
the.not = null

/**
 * @alias #required
 * @description
 * Fail tests with nullish values. (This is the default behaviour).
 * ```javascript
 * The().required(false).test(null) // -> true
 * The().required().test(null) // -> ValidationError
 * ```
 *
 * @param {Boolean} [isRequired] - Indicate if the tests are required.
 */
the.required = function (isRequired) {
  if (isRequired == null) isRequired = true
  this._required = Boolean(isRequired)
  return this
}

/**
 * @alias #optional
 * @description
 * Pass tests with nullish values.
 * ```javascript
 * The().optional().test(null) // -> true
 * The().optional(false).test(null) -> // ValidationError
 * ```
 *
 * @param {Boolean} [isOptional] - Indicate if the tests are optional.
 */
the.optional = function (isOptional) {
  if (isOptional == null) isOptional = true
  this._required = !isOptional
  return this
}

/**
 * @alias #merge
 * @description
 * Merge other tests onto the current instance.
 * ```javascript
 * The().string().merge(The().startWith('hi')).test('hi123') // -> true
 * The().string().merge(The().startWith('hi')).test('123hi') // -> ValidationError
 * ```
 *
 * @param {The} the - The The instance to merge with.
 */
the.merge = function (the) {
  if (!(the instanceof The)) throw new TypeError('Can only merge other The instances.')
  this._tests = this._tests.concat(the._tests)
  return this
}

/**
 * @alias #clone
 * @description
 * Make a copy of the current tests.
 */
the.clone = function () {
  var the = new The(this._meta)
  return the.merge(this)
}

/**
 * @static
 * @description
 * Adds new custom tests, with their negated (#not) counter parts.
 * ```javascript
 * The.extend({ any: funciton (value) { return true; } })
 * The().any().test(1) // -> true
 * ```
 *
 * @param {Object} tests - The tests to add.
 */
The.extend = function (tests) {
  for (var key in tests) {
    var test = tests[key]
    the[key] = prepareTest(key, test)
    if (key !== 'try' && key !== 'eval') {
      not[key] = prepareTest('not.' + key, test, true)
    }
  }

  return The
}

/**
 * @private
 * @description
 * Utility to build a test that will work with The and create its (#not) counter part.
 *
 * @param {String} type - the name of the test.
 * @param {Function} test - the tester function.
 * @param {Boolean} negated - is this the negated version?
 */
function prepareTest (type, test, negated) {
  return function () {
    var options = new Array(arguments.length)
    for (var i = options.length; i--;) options[i] = arguments[i]

    var config = { type: type }
    if (options.length) config.options = options
    var tester = test.apply(config, options)

    if (typeof tester !== 'function') {
      throw new TypeError('Invalid test (testers must return a function).')
    }

    var fn = negated
      ? function (value) { return !tester.call(this, value) }
      : tester

    fn.config = config

    this._._tests.push(fn)
    return this._
  }
}

module.exports = The.default = The
  .extend(require('./test/type'))
  .extend(require('./test/other'))
  .extend(require('./test/regex'))
  .extend(require('./test/helper'))
