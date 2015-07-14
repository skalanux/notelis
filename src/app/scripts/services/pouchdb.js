'use strict';

/**
 * @ngdoc service
 * @name applicationApp.pouchdb
 * @description
 * # pouchdb
 * Service in the applicationApp.
 */
angular.module('applicationApp')
  .factory('pouchdb', function () {
      /*globals PouchDB*/
      PouchDB.sync('notelis', 'http://127.0.0.1:5984/notes',{live:true});
      return new PouchDB('notelis');})
