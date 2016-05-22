'use strict'

var Ok = require('../')
var check = require('./check')

describe('Helper', function () {
  it('#try', function () {
    check({
      type: 'try',
      options: [Ok().string(), Ok().number()],
      pass: [1],
      fail: [true]
    })
  })
  it('#eval', function () {
    check({
      type: 'eval',
      options: [
        function (val) {
          return Ok().string()
        }
      ],
      pass: ['hello'],
      fail: [1]
    })
  })
})
