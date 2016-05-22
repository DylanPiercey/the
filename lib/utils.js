'use strict'

module.exports = {
  /**
   * @private
   * @description
   * Utility to merge all provided objects into a new one.
   *
   * @param {...Object} obj - An object to merge.
   * @return {Object}
   */
  merge: function (obj) {
    var result = {}

    for (var i = 0, len = arguments.length; i < len; i++) {
      var arg = arguments[i]
      for (var key in arg) {
        result[key] = arg[key]
      }
    }

    return result
  }
}
