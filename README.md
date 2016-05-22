# The
The flexible lightweight testing library.
(Formerly `oke`).

[![npm](https://img.shields.io/npm/dm/the.svg)](https://www.npmjs.com/package/the)

# Why
`The` was created to validate everything from javascript models and ajax requests to databases like CouchDB.
It allows for quick simple validations as well as complex nested validation.
Collections, objects and more are supported out of the box and it can be easily extended!

# Features
* Chainable tests that read clearly.
* Composable tests that make sense.
* Schema validation for complex objects and arrays.
* An error message structure that is terse and friendly for developers.

# Installation

#### Npm
```console
npm install the
```

# Example

```javascript
var the = require('the');

var schema = the().object({
    username: the().string().alphaNumeric().length(5, 30),
    password: the().string().optional().matches(/^[a-zA-Z0-9]{2,30}$/),
    phoneNumbers: the().array(
        the().string().phone()
    )
});

var doc = {
    username: 'Hello',
    password: 'World',
    phoneNumbers: [
        '123',
        '555-555-5555'
    ]
};

schema.assert(doc); // Throw an error unless doc matches the schema.
```

The above schema defines the following constraints:

* username
    * A required string.
    * Must contain only alpha numeric characters.
    * Between 5 and 30 characters long.
* password
    * An optional string.
    * Must satisfy custom regex.
* contacts
    * Must be an array.
    * Each element must be a string and a phone number.

---

## [Click for API Methods](https://github.com/DylanPiercey/the/blob/master/API.md)

---

## Error Structure

```javascript
{
    "name": "ValidationError",
    "message": "Validation Failed",
    "errors": {

        // The key is the full path of the error. In this case, the first phone number.
        'phoneNumbers.0':

        // Array of errors for this path.
        [
            {
                // The name of the failed validator.
                type: 'phone',

                // The value that was at the path (that failed).
                value: '123'
            }
        ]
    }
}
```

---

### Contributiors

* Use `npm test` to run tests.

Please feel free to recommend more default tests and/or submit a PR!
