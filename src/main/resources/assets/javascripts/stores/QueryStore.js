/**
 * QueryStore
 */

var BaseStore   = require('./BaseStore');
var AppDispatcher   = require('../dispatchers/AppDispatcher');
var QueryConstants  = require('../constants/QueryConstants');
var QueryApiUtils   = require('../utils/QueryApiUtils');

/* Other stores */
var UserStore = require('./UserStore');

/* Other constants */
var UserConstants   = require('../constants/UserConstants');

/* Query store */
var QueryStore = new BaseStore();

QueryStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case QueryConstants.CREATE_QUERY:
      QueryApiUtils.createQuery(action.data, { silent: true });
      break;

    case QueryConstants.RECEIVED_SINGLE_QUERY:
      QueryStore.add(action.query)
      QueryStore.emitChange('change');
      break;

    case QueryConstants.RECEIVED_MULTIPLE_QUERIES:
      QueryStore.add(action.queries);
      QueryStore.emitChange('change');
      break;

    default:
      // do nothing
  }

});

module.exports = QueryStore;