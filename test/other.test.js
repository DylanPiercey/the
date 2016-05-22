'use strict'

// var Ok = require('../')
var check = require('./check')

describe('Other', function () {
  it('#equal', function () {
    check({
      type: 'equal',
      options: [1, 2],
      pass: [1],
      fail: [3]
    })
  })
  it('#exist', function () {
    check({
      type: 'exist',
      pass: [''],
      fail: [null]
    })
  })
  it('#instanceOf', function () {
    check({
      type: 'instanceOf',
      options: [Error],
      pass: [new Error()],
      fail: [1]
    })
  })
  it('#length', function () {
    check({
      type: 'length',
      options: [1, 3],
      pass: ['hi'],
      fail: ['hello']
    })
  })
  it('#startWith', function () {
    check({
      type: 'startWith',
      options: ['hi'],
      pass: ['hi123'],
      fail: ['123hi']
    })
  })
  it('#include', function () {
    check({
      type: 'include',
      options: ['hi', '1'],
      pass: ['hi123'],
      fail: ['hi23']
    })
  })
  it('#endWith', function () {
    check({
      type: 'endWith',
      options: ['hi'],
      pass: ['123hi'],
      fail: ['hi123']
    })
  })
  it('#match', function () {
    check({
      type: 'match',
      options: [/^[a-z]+$/],
      pass: ['hi'],
      fail: ['hi123']
    })
  })
  it('#lowerCase', function () {
    check({
      type: 'lowerCase',
      pass: ['hi'],
      fail: ['Hi']
    })
  })
  it('#upperCase', function () {
    check({
      type: 'upperCase',
      pass: ['HI'],
      fail: ['Hi']
    })
  })
  it('#min', function () {
    check({
      type: 'min',
      options: [1],
      pass: [1],
      fail: [0]
    })
  })
  it('#more', function () {
    check({
      type: 'more',
      options: [1],
      pass: [2],
      fail: [1]
    })
  })
  it('#max', function () {
    check({
      type: 'max',
      options: [1],
      pass: [1],
      fail: [2]
    })
  })
  it('#less', function () {
    check({
      type: 'less',
      options: [1],
      pass: [0],
      fail: [1]
    })
  })
  it('#integer', function () {
    check({
      type: 'integer',
      pass: [1],
      fail: [1.1]
    })
  })
  it('#divisible', function () {
    check({
      type: 'divisible',
      options: [5],
      pass: [10],
      fail: [11]
    })
  })
  it('#precision', function () {
    check({
      type: 'precision',
      options: [1, 3],
      pass: [1.23],
      fail: [1.2345]
    })
  })
  it('#scale', function () {
    check({
      type: 'scale',
      options: [1, 3],
      pass: [123],
      fail: [12345]
    })
  })
  it('#unique', function () {
    check({
      type: 'unique',
      pass: [[1, 2, 3]],
      fail: [[1, 1, 3]]
    })
  })
  it('#json', function () {
    check({
      type: 'json',
      pass: ['{ "a": "b" }'],
      fail: ['hello']
    })
  })
})
