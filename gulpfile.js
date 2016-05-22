var fs = require('fs')
var path = require('path')
var dox = require('dox')
var gulp = require('gulp')
var mocha = require('gulp-mocha')

var LIB = path.join(__dirname, '/lib')
var TESTS = path.join(__dirname, '/test')

/*
 * Build api docs.
 */
gulp.task('build-doc', function () {
  var files = [
    'index.js',
    'test/type.js',
    'test/other.js',
    'test/regex.js',
    'test/helper.js'
  ]

  var contents = files.map(function (file) {
    return fs.readFileSync(path.join(LIB, '/', file), 'utf8')
  })

  fs.writeFileSync(
    path.join(__dirname, '/API.md'),
    dox.api(dox.parseComments(contents.join(''), { raw: true }))
  )
})

/*
 * Run tests.
 */
gulp.task('test', function () {
  return gulp.src(path.join(TESTS, '/**/*.test.js'), { read: false })
    .pipe(mocha())
    .once('finish', process.exit)
})
