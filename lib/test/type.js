'use strict'

var isType = require('is-typeof')

/*
 * @lends The
 */
module.exports = {
  /*
   * @alias The().string
   * @description
   * Value must be a String.
   * ```javascript
   * The().string().test("hello") //-> true
   * The().string().test(1) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  string: function () {
    return isType.string
  },

  /*
   * @alias The().number
   * @description
   * Value must be a Number.
   * ```javascript
   * The().number().test(1) //-> true
   * The().number().test("hello") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  number: function () {
    return isType.number
  },

  /*
   * @alias The().boolean
   * @description
   * Value must be a Boolean.
   * ```javascript
   * The().boolean().test(true) //-> true
   * The().boolean().test(1) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  boolean: function () {
    return isType.boolean
  },

  /*
   * @alias The().date
   * @description
   * Value must be a Date.
   * ```javascript
   * The().date().test(new Date) //-> true
   * The().date().test("2015-08-09T01:09:44.484Z") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  date: function () {
    return isType.date
  },

  /*
   * @alias The().regexp
   * @description
   * Value must be a RegExp.
   * ```javascript
   * The().regexp().test(/\d/) //-> true
   * The().regexp().test("/\d/") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  regexp: function () {
    return isType.regexp
  },

  /*
   * @alias The().error
   * @description
   * Value must be an Error.
   * ```javascript
   * The().error().test(new Error) //-> true
   * The().error().test(1) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  error: function () {
    return isType.error
  },

  /*
   * @alias The().function
   * @description
   * Value must be a Function.
   * ```javascript
   * The().function().test(function(){}) //-> true
   * The().function().test(1) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  function: function () {
    return isType.function
  },

  /*
   * @alias The().arguments
   * @description
   * Value must be a arguments from a function.
   * ```javascript
   * The().arguments().test(arguments) //-> true
   * The().arguments().test([]) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  arguments: function () {
    return isType.arguments
  },

  /*
   * @alias The().object
   * @description
   * Value must be an Object with the provided structure.
   * ```javascript
   * The().object({ a: The().string() }).test({ a: "hi" }) //-> true
   * The().object({ a: The().string() }).test({ a: 1 }) //-> ValidationError
   * ```
   *
   * @param {...Object} schema - A object schema that the value must match.
   * @throws {TypeError} schema keys must be valid tests.
   * @returns {Function}
   */
  object: function () {
    var schema = {}

    for (var _i = 0, _len = arguments.length; _i < _len; _i++) {
      var _arg = arguments[_i]
      for (var _key in _arg) {
        var _val = _arg[_key]
        if (!_val || typeof _val.test !== 'function') {
          throw new TypeError('Invalid "object" test options at ' + _key + '.')
        }
        schema[_key] = schema[_key] || []
        schema[_key].push(_val)
      }
    }

    return function (obj) {
      if (!isType.object(obj)) return false

      for (var field in schema) {
        var val = obj[field]
        var tests = schema[field]
        for (var i = tests.length; i--;) this.merge(tests[i].test(val), field)
      }

      for (var key in obj) {
        if (!(key in schema)) {
          this.add({
            value: obj[key],
            type: 'forbidden'
          })
        }
      }

      return true
    }
  },

  /*
   * @alias The().array
   * @description
   * Value must be an Array of items that pass the provided tests.
   * ```javascript
   * The().array(The().number()).test([1, 2, 3]) //-> true
   * The().array(The().number()).test([1, 2, "3"]) //-> ValidationError
   * ```
   *
   * @param {...The} test - A test that each item in the array must satisfy.
   * @throws {TypeError} tests must be valid tests.
   * @returns {Function}
   */
  array: function () {
    var schema = new Array(arguments.length)

    for (var _i = 0, _len = schema.length; _i < _len; _i++) {
      var _val = arguments[_i]
        if (!_val || typeof _val.test !== 'function') throw new TypeError('Invalid "array" test options.')
        schema[_i] = _val
    }

    return function (arr) {
      if (!isType.array(arr)) return false

      for (var i = arr.length; i--;) {
        var value = arr[i]
        for (var j = schema.length; j--;) {
          var test = schema[j]
          this.merge(test.test(value), i)
        }
      }

      return true
    }
  },

  /*
   * @alias The().stream
   * @description
   * Value must be a Stream.
   * ```javascript
   * The().stream().test(fs.createReadStream(...)) //-> true
   * The().stream().test(new Buffer("")) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  stream: function () {
    return isType.stream
  },

  /*
   * @alias The().buffer
   * @description
   * Value must be a Buffer.
   * ```javascript
   * The().stream().test(new Buffer("")) //-> true
   * The().stream().test(fs.createReadStream(...)) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  buffer: function () {
    return isType.buffer
  },

  /*
   * @alias The().empty
   * @description
   * Value must have no enumerable properties.
   * ```javascript
   * The().empty().test([]) //-> true
   * The().empty().test([1]) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  empty: function () {
    return isType.empty
  }
}
