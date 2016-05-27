'use strict'

var isType = require('is-typeof')

ValidationError.prototype = Object.create(TypeError.prototype)
var validationError = ValidationError.prototype
module.exports = ValidationError

/*
 * @private
 * @constructor
 * @description
 * Creates a custom validation error that can be added to or merged with others.
 */
function ValidationError () {
  this.errors = {}
}

validationError.name = 'ValidationError'
validationError.message = 'Validation Failed'
validationError.errors = null

/*
 * @private
 * @description
 * Appends a new error / array of errors on to the instance.
 */
validationError.add = function (errors, path) {
  if (!errors) return
  if (path == null) path = ''
  var cached = this.errors[path] = this.errors[path] || []

  if (isType.array(errors)) {
    for (var i = 0, len = errors.length; i < len; i++) {
      cached.push(errors[i])
    }
    return
  }

  cached.push(errors)
}

/*
 * @private
 * @description
 * Merges the 'toError' of another validation error on to this instance.
 */
validationError.merge = function (validationError, path) {
  if (!validationError) return
  if (path == null) path = ''
  var errors = validationError.errors

  if (isType.array(errors)) {
    this.add(errors, path)
    return
  }

  if (isType.object(errors)) {
    if (path !== '') path += '.'

    for (var key in errors) {
      this.add(errors[key], path + key)
    }
  }
}

/*
 * @private
 * @description
 * Finishes the error chain.
 * Switches to a list or object of errors.
 */
validationError.toError = function () {
  var errors = this.errors

  for (var i = 0, len = errors.length; i < len; i++) {
    if (errors[i] !== '') return this
  }

  this.errors = errors[''] || errors
  return this
}
