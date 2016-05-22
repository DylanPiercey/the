'use strict'

var Ok = require('../')

module.exports = function check (arg) {
  var type = arg.type
  var options = arg.options || []
  var pass = arg.pass || []
  var fail = arg.fail || []

  // Check for type name typos.
  if (!Ok.prototype[type]) throw new TypeError('Test does not exist.')

  // Run all valid tests.
  pass.forEach(function (val) {
    var ok = Ok()
    var result = ok[type].apply(ok, options).test(val)
    if (result.errors) {
      throw new Error(JSON.stringify(result.errors, null, 2))
    }
  })

  // Run all invalid tests.
  fail.forEach(function (val) {
    var ok = Ok()
    var result = ok[type].apply(ok, options).test(val)
    if (!result.errors) {
      throw new Error(type + ' should have failed')
    }
  })
}
