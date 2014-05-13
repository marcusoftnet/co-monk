
/**
 * Module dependencies.
 */

var co = require('co');
var coMonk = require('..');
var users = coMonk.getCollection('localhost/test', 'users')

describe('queries', function(){
  it('should work', function(done){
    co(function *(){
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

    })(done);
  })
})

describe('helpers', function () {
  it('provides easy access to monk databases', function (done) {
    var monkdb = coMonk.getMonkDb('localhost/test');
    monkdb.should.not.be.null;
    done();
  })

  it('provides easy access to collections in one line', function (done) {
    var us = coMonk.getCollection('localhost/test', 'users');
    us.should.not.be.null;
    done();
  })
})