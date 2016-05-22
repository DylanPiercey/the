  - [The()](#themetaobject)
  - [The().test(value:Any)](#thetestvalueany)
  - [The().assert(value:Any)](#theassertvalueany)
  - [The().not](#thenot)
  - [The().required([isRequired]:Boolean)](#therequiredisrequiredboolean)
  - [The().optional([isOptional]:Boolean)](#theoptionalisoptionalboolean)
  - [The().merge(the:The)](#themergethethe)
  - [The().clone()](#theclone)
  - [The.extend()](#theextendtestsobject)
  - [The().string()](#thestring)
  - [The().number()](#thenumber)
  - [The().boolean()](#theboolean)
  - [The().date()](#thedate)
  - [The().regexp()](#theregexp)
  - [The().error()](#theerror)
  - [The().function()](#thefunction)
  - [The().arguments()](#thearguments)
  - [The().object(schema:Object)](#theobjectschemaobject)
  - [The().array(test:The)](#thearraytestthe)
  - [The().stream()](#thestream)
  - [The().buffer()](#thebuffer)
  - [The().empty()](#theempty)
  - [The().equal(valid:)](#theequalvalid)
  - [The().exist()](#theexist)
  - [The().instanceOf(constructor:Function)](#theinstanceofconstructorfunction)
  - [The().length([min=0]:Number, [max=Infinity]:Number)](#thelengthmin0numbermaxinfinitynumber)
  - [The().startWith(start:Any)](#thestartwithstartany)
  - [The().include(valid:)](#theincludevalid)
  - [The().endWith(end:Any)](#theendwithendany)
  - [The().match(regExp:RegExp)](#thematchregexpregexp)
  - [The().lowerCase()](#thelowercase)
  - [The().upperCase()](#theuppercase)
  - [The().min(min:Number)](#theminminnumber)
  - [The().more(min:Number)](#themoreminnumber)
  - [The().max(max:Number)](#themaxmaxnumber)
  - [The().less(max:Number)](#thelessmaxnumber)
  - [The().integer()](#theinteger)
  - [The().divisible(divisor:Number)](#thedivisibledivisornumber)
  - [The().precision([min=0]:Number, [max=Infinity]:Number)](#theprecisionmin0numbermaxinfinitynumber)
  - [The().scale([min=0]:Number, [max=Infinity]:Number)](#thescalemin0numbermaxinfinitynumber)
  - [The().unique()](#theunique)
  - [The().json()](#thejson)

## The(meta:Object)

  

## The().test(value:Any)

  Run all of the attached tests against a provided value.
  ```javascript
  The().string().test(') // -> true
  The().string().test(1) // -> ValidationError
  ```

## The().assert(value:Any)

  Run all of the attached tests against a provided value and throws if any fail.
  ```javascript
  The().string().assert(') // -> true
  The().string().assert(1) // -> throw ValidationError
  ```

## The().not

  Stores negated versions of all tests.
  ```javascript
  The().not.string().test(1) // -> true
  The().not.string().test('1') // -> ValidationError
  ```

## The().required([isRequired]:Boolean)

  Fail tests with nullish values. (This is the default behaviour).
  ```javascript
  The().required(false).test(null) // -> true
  The().required().test(null) // -> ValidationError
  ```

## The().optional([isOptional]:Boolean)

  Pass tests with nullish values.
  ```javascript
  The().optional().test(null) // -> true
  The().optional(false).test(null) -> // ValidationError
  ```

## The().merge(the:The)

  Merge other tests onto the current instance.
  ```javascript
  The().string().merge(The().startWith('hi')).test('hi123') // -> true
  The().string().merge(The().startWith('hi')).test('123hi') // -> ValidationError
  ```

## The().clone()

  Make a copy of the current tests.

## The.extend(tests:Object)

  Adds new custom tests, with their negated (#not) counter parts.
  ```javascript
  The.extend({ any: funciton (value) { return true; } })
  The().any().test(1) // -> true
  ```

## The().string()

  Value must be a String.
  ```javascript
  The().string().test("hello") //-> true
  The().string().test(1) //-> ValidationError
  ```

## The().number()

  Value must be a Number.
  ```javascript
  The().number().test(1) //-> true
  The().number().test("hello") //-> ValidationError
  ```

## The().boolean()

  Value must be a Boolean.
  ```javascript
  The().boolean().test(true) //-> true
  The().boolean().test(1) //-> ValidationError
  ```

## The().date()

  Value must be a Date.
  ```javascript
  The().date().test(new Date) //-> true
  The().date().test("2015-08-09T01:09:44.484Z") //-> ValidationError
  ```

## The().regexp()

  Value must be a RegExp.
  ```javascript
  The().regexp().test(/\d/) //-> true
  The().regexp().test("/\d/") //-> ValidationError
  ```

## The().error()

  Value must be an Error.
  ```javascript
  The().error().test(new Error) //-> true
  The().error().test(1) //-> ValidationError
  ```

## The().function()

  Value must be a Function.
  ```javascript
  The().function().test(function(){}) //-> true
  The().function().test(1) //-> ValidationError
  ```

## The().arguments()

  Value must be a arguments from a function.
  ```javascript
  The().arguments().test(arguments) //-> true
  The().arguments().test([]) //-> ValidationError
  ```

## The().object(schema:Object)

  Value must be an Object with the provided structure.
  ```javascript
  The().object({ a: The().string() }).test({ a: "hi" }) //-> true
  The().object({ a: The().string() }).test({ a: 1 }) //-> ValidationError
  ```

## The().array(test:The)

  Value must be an Array of items that pass the provided tests.
  ```javascript
  The().array(The().number()).test([1, 2, 3]) //-> true
  The().array(The().number()).test([1, 2, "3"]) //-> ValidationError
  ```

## The().stream()

  Value must be a Stream.
  ```javascript
  The().stream().test(fs.createReadStream(...)) //-> true
  The().stream().test(new Buffer("")) //-> ValidationError
  ```

## The().buffer()

  Value must be a Buffer.
  ```javascript
  The().stream().test(new Buffer("")) //-> true
  The().stream().test(fs.createReadStream(...)) //-> ValidationError
  ```

## The().empty()

  Value must have no enumerable properties.
  ```javascript
  The().empty().test([]) //-> true
  The().empty().test([1]) //-> ValidationError
  ```

## The().equal(valid:)

  Value must equal one of the arguments.
  ```javascript
  The().equal(1, 2).test(1) //-> true
  The().equal(1, 2).test(3) //-> ValidationError
  ```

## The().exist()

  Value must not be nullish.
  ```javascript
  The().exist().test("") //-> true
  The().exist().test(null) //-> ValidationError
  ```

## The().instanceOf(constructor:Function)

  Value must be an instanceOf a constructor.
  ```javascript
  The().instanceOf(Error).test(new Error) //-> true
  The().instanceOf(Error).test(1) //-> ValidationError
  ```

## The().length([min=0]:Number, [max=Infinity]:Number)

  Value must have a #length within the provided range.
  ```javascript
  The().length(1, 3).test("hi") //-> true
  The().length(1, 3).test("hello") //-> ValidationError
  ```

## The().startWith(start:Any)

  Value must start with the provided argument.
  ```javascript
  The().startWith("hi").test("hi123") //-> true
  The().startWith("hi").test("123hi") //-> ValidationError
  ```

## The().include(valid:)

  Value must contain each argument.
  ```javascript
  The().include("hi", "1").test("hi123") //-> true
  The().include("hi").test("hi23") //-> ValidationError
  ```

## The().endWith(end:Any)

  Value must end with the provided argument.
  ```javascript
  The().endWith("hi").test("hi123") //-> ValidationError
  The().endWith("hi").test("123hi") //-> true
  ```

## The().match(regExp:RegExp)

  Value must match a provided regular expression.
  ```javascript
  The().match(/^[a-z]+$/).test("hi") //-> true
  The().match(/^[a-z]+$/).test("hi123") //-> ValidationError
  ```

## The().lowerCase()

  Value must be all lowercase.
  ```javascript
  The().lowerCase().test("hi") //-> true
  The().lowerCase().test("Hi") //-> ValidationError
  ```

## The().upperCase()

  Value must be all uppercase.
  ```javascript
  The().upperCase().test("HI") //-> true
  The().upperCase().test("Hi") //-> ValidationError
  ```

## The().min(min:Number)

  Value must be greater than or equal to a minimum.
  ```javascript
  The().min(1).test(1) //-> true
  The().min(1).test(0) //-> ValidationError
  ```

## The().more(min:Number)

  Value must be greater than a minimum.
  ```javascript
  The().more(1).test(2) //-> true
  The().more(1).test(1) //-> ValidationError
  ```

## The().max(max:Number)

  Value must be less than or equal to a maximum.
  ```javascript
  The().max(1).test(1) //-> true
  The().min(1).test(2) //-> ValidationError
  ```

## The().less(max:Number)

  Value must be less than a minimum.
  ```javascript
  The().less(1).test(0) //-> true
  The().less(1).test(1) //-> ValidationError
  ```

## The().integer()

  Value must be an integer.
  ```javascript
  The().integer().test(1) //-> true
  The().integer().test(1.1) //-> ValidationError
  ```

## The().divisible(divisor:Number)

  Value must divide evenly by a divisor.
  ```javascript
  The().divisible(5).test(10) //-> true
  The().divisible(5).test(11) //-> ValidationError
  ```

## The().precision([min=0]:Number, [max=Infinity]:Number)

  Value must have a precision within the provided range.
  ```javascript
  The().precision(1, 3).test(1.23) //-> true
  The().precision(1, 3).test(1.2345) //-> ValidationError
  ```

## The().scale([min=0]:Number, [max=Infinity]:Number)

  Value must have a scale within the provided range.
  ```javascript
  The().scale(1, 3).test(123) //-> true
  The().scale(1, 3).test(12345) //-> ValidationError
  ```

## The().unique()

  Value must consist of unique indexed items.
  ```javascript
  The().unique().test([1, 2, 3]) //-> true
  The().unique().test([1, 1, 3]) //-> ValidationError
  ```

## The().json()

  Value must successfully parse into JSON.
  ```javascript
  The().json().test('{ "a": "b" }') //-> true
  The().json().test("hello") //-> ValidationError
  ```
