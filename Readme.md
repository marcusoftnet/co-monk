
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

  You can also use the shortcut to create them in one go:

```js
var wrap = require('co-monk');
var users = wrap.getCollection('localhost/test', 'users');
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


  Note; in order to run these examples you need someone to handle the yields, someone like [co](https://github.com/visionmedia/co) or [KoaJs](http://koajs.com/).
  A full, simple example looks like this

```js
var co = require('co');
var users = require('co-monk')
	.getCollection('localhost/test', 'users');

co(function *(){
	yield users.insert({ name: 'Tobi', species: 'ferret' })
	console.log("BAM! User inserted - 2 ");
})();
  ```

# License

  MIT