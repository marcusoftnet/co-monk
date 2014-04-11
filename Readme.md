# co-monk

  MongoDB with generator goodness.

## Installation

```
$ npm install co-monk
```

## Setup

  Call `wrap()` on collections to make them generator friendly:

```js
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/test');

var users = wrap(db.get('users'));
```

## Example

  Simple example:

```js
yield users.remove({});

yield users.insert({ name: 'Tobi', species: 'ferret' });
yield users.insert({ name: 'Loki', species: 'ferret' });
yield users.insert({ name: 'Jane', species: 'ferret' });

var res = yield users.findOne({ name: 'Tobi' });
res.name.should.equal('Tobi');

var res = yield users.find({ species: 'ferret' });
res.should.have.length(3);
```

  Parallel inserts:

```js
yield users.remove({});

yield [
  users.insert({ name: 'Tobi', species: 'ferret' }),
  users.insert({ name: 'Loki', species: 'ferret' }),
  users.insert({ name: 'Jane', species: 'ferret' })
];

var res = yield users.findOne({ name: 'Tobi' });
res.name.should.equal('Tobi');

var res = yield users.find({ species: 'ferret' });
res.should.have.length(3);
```

# I get a "SyntaxError: Unexpected identifier" when I run that
This code needs to be wrapped in a generator function before you can execute it. You can do that using the co-library like this:
```js
var co = require('co');
// all the other requires from the examples above

// Now wrap the code in a generator that you send to co
co(function *(){
	yield users.remove({});
	// the rest of the code from above
	... 
	// finally end generator function
	// and execute co
})();
```

# License

  MIT
