'use strict'

var slice = [].slice

/*
 * @lends The
 */
module.exports = {
  /*
   * @alias The().equal
   * @description
   * Value must equal one of the arguments.
   * ```javascript
   * The().equal(1, 2).test(1) //-> true
   * The().equal(1, 2).test(3) //-> ValidationError
   * ```
   *
   * @param {...*} valid - An accepted value for the test.
   * @returns {Function}
   */
  equal: function () {
    var valid = slice.call(arguments)

    return function (value) {
      return valid.indexOf(value) >= 0
    }
  },

  /*
   * @alias The().exist
   * @description
   * Value must not be nullish.
   * ```javascript
   * The().exist().test("") //-> true
   * The().exist().test(null) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  exist: function () {
    return function (value) {
      return value != null
    }
  },

  /*
   * @alias The().instanceOf
   * @description
   * Value must be an instanceOf a constructor.
   * ```javascript
   * The().instanceOf(Error).test(new Error) //-> true
   * The().instanceOf(Error).test(1) //-> ValidationError
   * ```
   *
   * @param {Function} constructor - The constructor that the value must be an instanceof.
   * @returns {Function}
   */
  instanceOf: function (constructor) {
    return function (value) {
      return value instanceof constructor
    }
  },

  /*
   * @alias The().length
   * @description
   * Value must have a #length within the provided range.
   * ```javascript
   * The().length(1, 3).test("hi") //-> true
   * The().length(1, 3).test("hello") //-> ValidationError
   * ```
   *
   * @param {Number} [min=0] - The minimum length.
   * @param {Number} [max=Infinity] - The maximum length.
   * @returns {Function}
   */
  length: function (min, max) {
    if (min == null) min = 0
    if (max == null) max = Infinity

    return function (value) {
      var length = value && value.length
      return min <= length && length <= max
    }
  },

  /*
   * @alias The().startWith
   * @description
   * Value must start with the provided argument.
   * ```javascript
   * The().startWith("hi").test("hi123") //-> true
   * The().startWith("hi").test("123hi") //-> ValidationError
   * ```
   *
   * @param {Any} start - The required starting value.
   * @returns {Function}
   */
  startWith: function (start) {
    return function (value) {
      return Boolean(
        value &&
        typeof value.indexOf === 'function' &&
        value.indexOf(start) === 0
      )
    }
  },

  /*
   * @alias The().include
   * @description
   * Value must contain each argument.
   * ```javascript
   * The().include("hi", "1").test("hi123") //-> true
   * The().include("hi").test("hi23") //-> ValidationError
   * ```
   *
   * @param {...*} valid - An item that the value must contain.
   * @returns {Function}
   */
  include: function () {
    var required = slice.call(arguments)

    return function (value) {
      if (!value || typeof value.indexOf !== 'function') return false

      for (var i = required.length; i--;) {
        if (value.indexOf(required[i]) === -1) return false
      }

      return true
    }
  },

  /*
   * @alias The().endWith
   * @description
   * Value must end with the provided argument.
   * ```javascript
   * The().endWith("hi").test("hi123") //-> ValidationError
   * The().endWith("hi").test("123hi") //-> true
   * ```
   *
   * @param {Any} end - The required ending value.
   * @returns {Function}
   */
  endWith: function (end) {
    return function (value) {
      if (!value) return false
      if (typeof value.indexOf !== 'function') return false
      return value.length > 0 && value.indexOf(end) === value.length - end.length
    }
  },

  /*
   * @alias The().match
   * @description
   * Value must match a provided regular expression.
   * ```javascript
   * The().match(/^[a-z]+$/).test("hi") //-> true
   * The().match(/^[a-z]+$/).test("hi123") //-> ValidationError
   * ```
   *
   * @param {RegExp} regExp - The regex to test with.
   * @returns {Function}
   */
  match: function (regExp) {
    return function (value) {
      return regExp.test(value)
    }
  },

  /*
   * @alias The().lowerCase
   * @description
   * Value must be all lowercase.
   * ```javascript
   * The().lowerCase().test("hi") //-> true
   * The().lowerCase().test("Hi") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  lowerCase: function () {
    return function (value) {
      return (
        value != null &&
        typeof value.toLowerCase === 'function' &&
        value.toLowerCase() === value
      )
    }
  },

  /*
   * @alias The().upperCase
   * @description
   * Value must be all uppercase.
   * ```javascript
   * The().upperCase().test("HI") //-> true
   * The().upperCase().test("Hi") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  upperCase: function () {
    return function (value) {
      return (
        value != null &&
        typeof value.toUpperCase === 'function' &&
        value.toUpperCase() === value
      )
    }
  },

  /*
   * @alias The().min
   * @description
   * Value must be greater than or equal to a minimum.
   * ```javascript
   * The().min(1).test(1) //-> true
   * The().min(1).test(0) //-> ValidationError
   * ```
   *
   * @param {Number} min - The minimum allowed value.
   * @returns {Function}
   */
  min: function (min) {
    return function (value) {
      return value >= min
    }
  },

  /*
   * @alias The().more
   * @description
   * Value must be greater than a minimum.
   * ```javascript
   * The().more(1).test(2) //-> true
   * The().more(1).test(1) //-> ValidationError
   * ```
   *
   * @param {Number} min - The minimum value.
   * @returns {Function}
   */
  more: function (min) {
    return function (value) {
      return value > min
    }
  },

  /*
   * @alias The().max
   * @description
   * Value must be less than or equal to a maximum.
   * ```javascript
   * The().max(1).test(1) //-> true
   * The().min(1).test(2) //-> ValidationError
   * ```
   *
   * @param {Number} max - The maximum allowed value.
   * @returns {Function}
   */
  max: function (max) {
    return function (value) {
      return value <= max
    }
  },

  /*
   * @alias The().less
   * @description
   * Value must be less than a minimum.
   * ```javascript
   * The().less(1).test(0) //-> true
   * The().less(1).test(1) //-> ValidationError
   * ```
   *
   * @param {Number} max - The maximum value.
   * @returns {Function}
   */
  less: function (max) {
    return function (value) {
      return value < max
    }
  },

  /*
   * @alias The().integer
   * @description
   * Value must be an integer.
   * ```javascript
   * The().integer().test(1) //-> true
   * The().integer().test(1.1) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  integer: function () {
    return function (value) {
      return value % 1 === 0
    }
  },

  /*
   * @alias The().divisible
   * @description
   * Value must divide evenly by a divisor.
   * ```javascript
   * The().divisible(5).test(10) //-> true
   * The().divisible(5).test(11) //-> ValidationError
   * ```
   *
   * @param {Number} divisor - The divisor.
   * @returns {Function}
   */
  divisible: function (divisor) {
    return function (value) {
      return value % divisor === 0
    }
  },

  /*
   * @alias The().precision
   * @description
   * Value must have a precision within the provided range.
   * ```javascript
   * The().precision(1, 3).test(1.23) //-> true
   * The().precision(1, 3).test(1.2345) //-> ValidationError
   * ```
   *
   * @param {Number} [min=0] - The minimum precision.
   * @param {Number} [max=Infinity] - The maximum precision.
   * @returns {Function}
   */
  precision: function (min, max) {
    if (min == null) min = 0
    if (max == null) max = Infinity

    return function (value) {
      var num = Number(value)
      var length = (String(num).split('.')[1] || '').length

      return (
        isFinite(num) &&
        min <= length &&
        length <= max
      )
    }
  },

  /*
   * @alias The().scale
   * @description
   * Value must have a scale within the provided range.
   * ```javascript
   * The().scale(1, 3).test(123) //-> true
   * The().scale(1, 3).test(12345) //-> ValidationError
   * ```
   *
   * @param {Number} [min=0] - The minimum scale.
   * @param {Number} [max=Infinity] - The maximum scale.
   * @returns {Function}
   */
  scale: function (min, max) {
    if (min == null) min = 0
    if (max == null) max = Infinity

    return function (value) {
      var num = Number(value)
      var length = (String(num).split('.')[0] || '').length

      return (
        isFinite(num) &&
        min <= length &&
        length <= max
      )
    }
  },

  /*
   * @alias The().unique
   * @description
   * Value must consist of unique indexed items.
   * ```javascript
   * The().unique().test([1, 2, 3]) //-> true
   * The().unique().test([1, 1, 3]) //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  unique: function () {
    return function (value) {
      if (!value || typeof value.indexOf !== 'function') return true

      for (var i = value.length; i--;) {
        if (value.indexOf(value[i]) !== i) return false
      }

      return true
    }
  },

  /*
   * @alias The().json
   * @description
   * Value must successfully parse into JSON.
   * ```javascript
   * The().json().test('{ "a": "b" }') //-> true
   * The().json().test("hello") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  json: function () {
    return function (value) {
      try {
        JSON.parse(value)
        return true
      } catch (_) {
        return false
      }
    }
  }
}
