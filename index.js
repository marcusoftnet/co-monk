
/**
 * Module dependencies.
 */

var thunkify = require('thunkify');
var helpers = require('./lib/helpers.js');

/**
 * Methods to wrap.
 */

var methods = [
  'drop',
  'update',
  'updateById',
  'remove',
  'count',
  'find',
  'findOne',
  'findById',
  'findAndModify',
  'insert'
];

/**
 * Wrap `col`.
 *
 * @param {Collection} col
 * @return {Collection}
 * @api public
 */

module.exports = function(col){
  methods.forEach(function(method){
    col[method] = thunkify(col[method]);
  });

  return col;
};

/**
 * Creates generator friendly collection
 *
 * @param {connectionString} connection string to mongodb
 * @param {collectionName} the name of the collection to return
 * @return {Collection}
 * @api public
 */

module.exports.getCollection = helpers.getCoMonkCollection;

/**
 * Creates an monk database from the connectionstring
 *
 * @param {connectionString} connection string to mongodb
 * @return {database} a monk database object
 * @api public
 */
module.exports.getMonkDb = helpers.getDatabase;
