'use strict'

var isType = require('is-typeof')

/*
 * @lends The
 */
module.exports = {
  /*
   * @alias The().try
   * @description
   * Attempts all provided The instances to see if any pass.
   * ```javascript
   * The().try(The().string(), The().number()).test(1) //-> true
   * The().try(The().string(), The().boolean()).test(1) //-> ValidationError
   * ```
   *
   * @param {...The} test - A test to attempt.
   * @throws {TypeError} tests must be valid The instances.
   * @returns {Function}
   */
  try: function () {
    var schema = []

    for (var _i = arguments.length; _i--;) {
      var arg = arguments[_i]
      if (!arg || typeof arg.test !== 'function') throw new TypeError('Invalid "try" test options.')
      schema.push(arg)
    }

    return function (value) {
      var errors = []

      for (var i = schema.length; i--;) {
        var result = schema[i].test(value)
        if (result === true) return true
        errors.push(result)
      }

      for (i = errors.length; i--;) this.merge(errors[i])

      return true
    }
  },

  /*
   * @alias The().eval
   * @description
   * Runs a function with the test value.
   * Tests returned from the function will then be evaluated.
   * ```javascript
   * The().eval((val)=> The().string()).test(1) //-> ValidationError
   * ```
   *
   * @param {Function} fn - A function that will return the test to run.
   * @throws {TypeError} fn must be a function.
   * @returns {Function}
   */
  eval: function (fn) {
    if (!isType.function(fn)) throw new TypeError("Invalid \"eval\" test options.")

    return function (value) {
      var test = fn(value)
      if (test && typeof test.test === 'function') this.merge(test.test(value))
      return true
    }
  }
}
