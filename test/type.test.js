'use strict'

var fs = require('fs')
var path = require('path')
var Ok = require('../')
var check = require('./check')

describe('Type', function () {
  it('#string', function () {
    check({
      type: 'string',
      pass: ['hello'],
      fail: [1]
    })
  })
  it('#number', function () {
    check({
      type: 'number',
      pass: [1],
      fail: ['hello']
    })
  })
  it('#boolean', function () {
    check({
      type: 'boolean',
      pass: [true],
      fail: [1]
    })
  })
  it('#date', function () {
    check({
      type: 'date',
      pass: [new Date()],
      fail: ['2015-08-09T01:09:44.484Z']
    })
  })
  it('#regexp', function () {
    check({
      type: 'regexp',
      pass: [/\d/],
      fail: ['/\\d/']
    })
  })
  it('#error', function () {
    check({
      type: 'error',
      pass: [new Error()],
      fail: [1]
    })
  })
  it('#function', function () {
    check({
      type: 'function',
      pass: [function () {}],
      fail: [1]
    })
  })
  it('#arguments', function () {
    check({
      type: 'arguments',
      pass: [arguments],
      fail: [[]]
    })
  })
  it('#object', function () {
    check({
      type: 'object',
      options: [
        {
          a: Ok().string()
        }
      ],
      pass: [
        {
          a: 'hi'
        }
      ],
      fail: [
        {
          a: 1
        }
      ]
    })
  })
  it('#array', function () {
    check({
      type: 'array',
      options: [Ok().number()],
      pass: [[1, 2, 3]],
      fail: [[1, 2, '3']]
    })
  })
  it('#stream', function () {
    check({
      type: 'stream',
      pass: [fs.createReadStream(path.join(__dirname, '/type.test.js'))],
      fail: [Buffer.from('')]
    })
  })
  it('#buffer', function () {
    check({
      type: 'buffer',
      pass: [Buffer.from('')],
      fail: [1]
    })
  })
  it('#empty', function () {
    check({
      type: 'empty',
      pass: [[]],
      fail: [[1]]
    })
  })
})
