'use strict'

// var Ok = require('../')
var check = require('./check')

describe('RegExp', function () {
  it('#ascii', function () {
    check({
      type: 'ascii',
      pass: ['copyright'],
      fail: ['©']
    })
  })
  it('#alpha', function () {
    check({
      type: 'alpha',
      pass: ['hello'],
      fail: ['hello1']
    })
  })
  it('#numeric', function () {
    check({
      type: 'numeric',
      pass: ['1'],
      fail: ['hello']
    })
  })
  it('#alphaNumeric', function () {
    check({
      type: 'alphaNumeric',
      pass: ['hello1'],
      fail: ['hello1!!']
    })
  })
  it('#hex', function () {
    check({
      type: 'hex',
      pass: ['1234567890abcdef'],
      fail: ['1234567890abcdefg']
    })
  })
  it('#hexColor', function () {
    check({
      type: 'hexColor',
      pass: ['FFF'],
      fail: ['GGG']
    })
  })
  it('#email', function () {
    check({
      type: 'email',
      pass: ['a@b.com'],
      fail: ['test.com']
    })
  })
  it('#phone', function () {
    check({
      type: 'phone',
      pass: ['1-(555)-555-5555'],
      fail: ['$1-(555)-555-5555']
    })
  })
  it('#html', function () {
    check({
      type: 'html',
      pass: ['<p>hi</p>'],
      fail: ['<please/']
    })
  })
  it('#mongo', function () {
    check({
      type: 'mongo',
      pass: ['55c6972f4f0f3d0b6e01441a'],
      fail: ['55c6972f4f0f3d0b6e01441']
    })
  })
  it('#ip', function () {
    check({
      type: 'ip',
      options: [4],
      pass: ['68.180.194.242'],
      fail: ['68.180.194']
    })
  })
  it('#creditCard', function () {
    check({
      type: 'creditCard',
      options: ['Visa', 'MasterCard'],
      pass: ['5500 0000 0000 0004'],
      fail: ['3000 0000 0000 04']
    })
  })
})
