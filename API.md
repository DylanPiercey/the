  - [The()](#themetaobject)
  - [#test()](#testvalueany)
  - [#assert()](#assertvalueany)
  - [#not](#not)
  - [#required()](#requiredisrequiredboolean)
  - [#optional()](#optionalisoptionalboolean)
  - [#merge()](#mergethethe)
  - [#clone()](#clone)
  - [The.extend()](#theextendtestsobject)
  - [#string()](#string)
  - [#number()](#number)
  - [#boolean()](#boolean)
  - [#date()](#date)
  - [#regexp()](#regexp)
  - [#error()](#error)
  - [#function()](#function)
  - [#arguments()](#arguments)
  - [#object()](#objectschemaobject)
  - [#array()](#arraytestthe)
  - [#stream()](#stream)
  - [#buffer()](#buffer)
  - [#empty()](#empty)
  - [#equal()](#equalvalid)
  - [#exist()](#exist)
  - [#instanceOf()](#instanceofconstructorfunction)
  - [#length()](#lengthmin0numbermaxinfinitynumber)
  - [#startWith()](#startwithstartany)
  - [#include()](#includevalid)
  - [#endWith()](#endwithendany)
  - [#match()](#matchregexpregexp)
  - [#lowerCase()](#lowercase)
  - [#upperCase()](#uppercase)
  - [#min()](#minminnumber)
  - [#more()](#moreminnumber)
  - [#max()](#maxmaxnumber)
  - [#less()](#lessmaxnumber)
  - [#integer()](#integer)
  - [#divisible()](#divisibledivisornumber)
  - [#precision()](#precisionmin0numbermaxinfinitynumber)
  - [#scale()](#scalemin0numbermaxinfinitynumber)
  - [#unique()](#unique)
  - [#json()](#json)
  - [ascii](#ascii)
  - [alpha](#alpha)

## The(meta:Object)

  

## #test(value:Any)

  Run all of the attached tests against a provided value.
  ```javascript
  The().string().test('') // -> true
  The().string().test(1) // -> ValidationError
  ```

## #assert(value:Any)

  Run all of the attached tests against a provided value and throws if any fail.
  ```javascript
  The().string().assert('') // -> true
  The().string().assert(1) // -> throw ValidationError
  ```

## #not

  Stores negated versions of all tests.
  ```javascript
  The().not.string().test(1) // -> true
  The().not.string().test('1') // -> ValidationError
  ```

## #required([isRequired]:Boolean)

  Fail tests with nullish values. (This is the default behaviour).
  ```javascript
  The().required(false).test(null) // -> true
  The().required().test(null) // -> ValidationError
  ```

## #optional([isOptional]:Boolean)

  Pass tests with nullish values.
  ```javascript
  The().optional().test(null) // -> true
  The().optional(false).test(null) -> // ValidationError
  ```

## #merge(the:The)

  Merge other tests onto the current instance.
  ```javascript
  The().string().merge(The().startWith('hi')).test('hi123') // -> true
  The().string().merge(The().startWith('hi')).test('123hi') // -> ValidationError
  ```

## #clone()

  Make a copy of the current tests.

## The.extend(tests:Object)

  Adds new custom tests, with their negated (#not) counter parts.
  ```javascript
  The.extend({ any: funciton (value) { return true; } })
  The().any().test(1) // -> true
  ```

## #string()

  Value must be a String.
  ```javascript
  The().string().test("hello") //-> true
  The().string().test(1) //-> ValidationError
  ```

## #number()

  Value must be a Number.
  ```javascript
  The().number().test(1) //-> true
  The().number().test("hello") //-> ValidationError
  ```

## #boolean()

  Value must be a Boolean.
  ```javascript
  The().boolean().test(true) //-> true
  The().boolean().test(1) //-> ValidationError
  ```

## #date()

  Value must be a Date.
  ```javascript
  The().date().test(new Date) //-> true
  The().date().test("2015-08-09T01:09:44.484Z") //-> ValidationError
  ```

## #regexp()

  Value must be a RegExp.
  ```javascript
  The().regexp().test(/\d/) //-> true
  The().regexp().test("/\d/") //-> ValidationError
  ```

## #error()

  Value must be an Error.
  ```javascript
  The().error().test(new Error) //-> true
  The().error().test(1) //-> ValidationError
  ```

## #function()

  Value must be a Function.
  ```javascript
  The().function().test(function(){}) //-> true
  The().function().test(1) //-> ValidationError
  ```

## #arguments()

  Value must be a arguments from a function.
  ```javascript
  The().arguments().test(arguments) //-> true
  The().arguments().test([]) //-> ValidationError
  ```

## #object(schema:Object)

  Value must be an Object with the provided structure.
  ```javascript
  The().object({ a: The().string() }).test({ a: "hi" }) //-> true
  The().object({ a: The().string() }).test({ a: 1 }) //-> ValidationError
  ```

## #array(test:The)

  Value must be an Array of items that pass the provided tests.
  ```javascript
  The().array(The().number()).test([1, 2, 3]) //-> true
  The().array(The().number()).test([1, 2, "3"]) //-> ValidationError
  ```

## #stream()

  Value must be a Stream.
  ```javascript
  The().stream().test(fs.createReadStream(...)) //-> true
  The().stream().test(new Buffer("")) //-> ValidationError
  ```

## #buffer()

  Value must be a Buffer.
  ```javascript
  The().stream().test(new Buffer("")) //-> true
  The().stream().test(fs.createReadStream(...)) //-> ValidationError
  ```

## #empty()

  Value must have no enumerable properties.
  ```javascript
  The().empty().test([]) //-> true
  The().empty().test([1]) //-> ValidationError
  ```

## #equal(valid:)

  Value must equal one of the arguments.
  ```javascript
  The().equal(1, 2).test(1) //-> true
  The().equal(1, 2).test(3) //-> ValidationError
  ```

## #exist()

  Value must not be nullish.
  ```javascript
  The().exist().test("") //-> true
  The().exist().test(null) //-> ValidationError
  ```

## #instanceOf(constructor:Function)

  Value must be an instanceOf a constructor.
  ```javascript
  The().instanceOf(Error).test(new Error) //-> true
  The().instanceOf(Error).test(1) //-> ValidationError
  ```

## #length([min=0]:Number, [max=Infinity]:Number)

  Value must have a #length within the provided range.
  ```javascript
  The().length(1, 3).test("hi") //-> true
  The().length(1, 3).test("hello") //-> ValidationError
  ```

## #startWith(start:Any)

  Value must start with the provided argument.
  ```javascript
  The().startWith("hi").test("hi123") //-> true
  The().startWith("hi").test("123hi") //-> ValidationError
  ```

## #include(valid:)

  Value must contain each argument.
  ```javascript
  The().include("hi", "1").test("hi123") //-> true
  The().include("hi").test("hi23") //-> ValidationError
  ```

## #endWith(end:Any)

  Value must end with the provided argument.
  ```javascript
  The().endWith("hi").test("hi123") //-> ValidationError
  The().endWith("hi").test("123hi") //-> true
  ```

## #match(regExp:RegExp)

  Value must match a provided regular expression.
  ```javascript
  The().match(/^[a-z]+$/).test("hi") //-> true
  The().match(/^[a-z]+$/).test("hi123") //-> ValidationError
  ```

## #lowerCase()

  Value must be all lowercase.
  ```javascript
  The().lowerCase().test("hi") //-> true
  The().lowerCase().test("Hi") //-> ValidationError
  ```

## #upperCase()

  Value must be all uppercase.
  ```javascript
  The().upperCase().test("HI") //-> true
  The().upperCase().test("Hi") //-> ValidationError
  ```

## #min(min:Number)

  Value must be greater than or equal to a minimum.
  ```javascript
  The().min(1).test(1) //-> true
  The().min(1).test(0) //-> ValidationError
  ```

## #more(min:Number)

  Value must be greater than a minimum.
  ```javascript
  The().more(1).test(2) //-> true
  The().more(1).test(1) //-> ValidationError
  ```

## #max(max:Number)

  Value must be less than or equal to a maximum.
  ```javascript
  The().max(1).test(1) //-> true
  The().min(1).test(2) //-> ValidationError
  ```

## #less(max:Number)

  Value must be less than a minimum.
  ```javascript
  The().less(1).test(0) //-> true
  The().less(1).test(1) //-> ValidationError
  ```

## #integer()

  Value must be an integer.
  ```javascript
  The().integer().test(1) //-> true
  The().integer().test(1.1) //-> ValidationError
  ```

## #divisible(divisor:Number)

  Value must divide evenly by a divisor.
  ```javascript
  The().divisible(5).test(10) //-> true
  The().divisible(5).test(11) //-> ValidationError
  ```

## #precision([min=0]:Number, [max=Infinity]:Number)

  Value must have a precision within the provided range.
  ```javascript
  The().precision(1, 3).test(1.23) //-> true
  The().precision(1, 3).test(1.2345) //-> ValidationError
  ```

## #scale([min=0]:Number, [max=Infinity]:Number)

  Value must have a scale within the provided range.
  ```javascript
  The().scale(1, 3).test(123) //-> true
  The().scale(1, 3).test(12345) //-> ValidationError
  ```

## #unique()

  Value must consist of unique indexed items.
  ```javascript
  The().unique().test([1, 2, 3]) //-> true
  The().unique().test([1, 1, 3]) //-> ValidationError
  ```

## #json()

  Value must successfully parse into JSON.
  ```javascript
  The().json().test('{ "a": "b" }') //-> true
  The().json().test("hello") //-> ValidationError
  ```

## ascii

  eslint-disable

## alpha

  eslint-enable
