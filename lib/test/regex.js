'use strict'

/*eslint-disable */
var ascii = /^[\x00-\x7F]+$/
/*eslint-enable */
var alpha = /^[a-z]+$/i
var numeric = /^-?\d+$/
var alphaNumeric = /^[a-z\d]+$/i
var hex = /^[a-f\d]+$/i
var hexColor = /^#?([a-f\d]{3}|[a-f\d]{6})$/i
var email = /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/i
var phone = /^(\+?\d)?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/
var html = /<\/?\w+((\s+\w+(\s *= \s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/
var mongo = /^[a-f\d]{24}$/i
var ip = {
  v4: /^(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})$/,
  v6: /^::|^::1|^([a-f\d]{1,4}::?){1,7}([a-f\d]{1,4})$/i
}
var cards = {
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  visa: /^4\d{12}(?:\d{3})?$/,
  discover: /^6(?:011|5\d{2})\d{12}$/,
  dinersclub: /^3(?:0[0-5]|[68]\d)\d{11}$/,
  mastercard: /^5[1-5]\d{14}$/,
  americanexpress: /^3[47]\d{13}$/
}

/*
 * @lends The
 */
module.exports = {
  /*
   * @alias #ascii
   * @description
   * Value must only contain ascii characters.
   * ```javascript
   * The().ascii().test("copyright") //-> true
   * The().ascii().test("©") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  ascii: function () {
    return function (value) {
      return ascii.test(value)
    }
  },

  /*
   * @alias #alpha
   * @description
   * Value must only contain letters.
   * ```javascript
   * The().alpha().test("hello") //-> true
   * The().alpha().test("hello1") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  alpha: function () {
    return function (value) {
      return alpha.test(value)
    }
  },

  /*
   * @alias #numeric
   * @description
   * Value must only contain numbers.
   * ```javascript
   * The().numeric().test("1") //-> true
   * The().numeric().test("hello") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  numeric: function () {
    return function (value) {
      return numeric.test(value)
    }
  },

  /*
   * @alias #alphaNumeric
   * @description
   * Value must only contain letters and numbers.
   * ```javascript
   * The().alphaNumeric().test("hello1") //-> true
   * The().alphaNumeric().test("hello1!!") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  alphaNumeric: function () {
    return function (value) {
      return alphaNumeric.test(value)
    }
  },

  /*
   * @alias #hex
   * @description
   * Value must only contain hexadecimal characters.
   * ```javascript
   * The().hex().test("1234567890abcdef") //-> true
   * The().hex().test("1234567890abcdefg") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  hex: function () {
    return function (value) {
      return hex.test(value)
    }
  },

  /*
   * @alias #hexColor
   * @description
   * Value must only contain a valid hexadecimal color.
   * ```javascript
   * The().hexColor().test("FFF") //-> true
   * The().hexColor().test("GGG") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  hexColor: function () {
    return function (value) {
      return hexColor.test(value)
    }
  },

  /*
   * @alias #email
   * @description
   * Value must only contain an email address.
   * ```javascript
   * The().email().test("a@b.com") //-> true
   * The().email().test("test.com") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  email: function () {
    return function (value) {
      return email.test(value)
    }
  },

  /*
   * @alias #phone
   * @description
   * Value must only contain a phone number.
   * ```javascript
   * The().phone().test("1-(555)-555-5555") //-> true
   * The().phone().test("$1-(555)-555-5555") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  phone: function () {
    return function (value) {
      return phone.test(value)
    }
  },

  /*
   * @alias #html
   * @description
   * Value must contain some html.
   * ```javascript
   * The().html().test("<p>hi</p>") //-> true
   * The().html().test("<please/") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  html: function () {
    return function (value) {
      return html.test(value)
    }
  },

  /*
   * @alias #mongo
   * @description
   * Value must be a mongo-db id.
   * ```javascript
   * The().mongo().test("55c6972f4f0f3d0b6e01441a") //-> true
   * The().mongo().test("55c6972f4f0f3d0b6e01441") //-> ValidationError
   * ```
   *
   * @returns {Function}
   */
  mongo: function () {
    return function (value) {
      return mongo.test(value)
    }
  },

  /*
   * @alias #ip
   * @description
   * Value must be ipv4 or ipv6 address.
   * ```javascript
   * The().ip(4).test("68.180.194.242") //-> true
   * The().ip(4).test("68.180.194") //-> ValidationError
   * ```
   *
   * @param {String} [version="4"||"6"] - Ipv4 or Ipv6.
   * @returns {Function}
   */
  ip: function (version) {
    version = Number(version)

    return function (value) {
      switch (version) {
        case 4:
          return ip.v4.test(value)
        case 6:
          return ip.v6.test(value)
        default:
          return ip.v4.test(value) || ip.v6.test(value)
      }
    }
  },

  /*
   * @alias #creditCard
   * @description
   * Value must be a credit card number.
   * Supported cards [jcb, visa, discover, dinersclub, mastercard, americanexpress].
   * ```javascript
   * The().creditCard("Visa", "MasterCard").test("5500 0000 0000 0004") //-> true
   * The().creditCard("Visa", "MasterCard").test("3000 0000 0000 04") //-> ValidationError
   * ```
   *
   * @param {...String} [card] - Valid credit cards to accept, or any card.
   * @returns {Function}
   */
  creditCard: function (card) {
    var valid = !arguments.length ? Object.keys(cards) : []

    if (!valid.length) {
      for (var _i = arguments.length; _i--;) {
        valid.push(String(arguments[_i]).toLowerCase())
      }
    }

    return function (value) {
      value = value.replace(/-| /g, '')

      for (var i = valid.length; i--;) {
        if (cards[valid[i]].test(value)) return true
      }

      return false
    }
  }
}
