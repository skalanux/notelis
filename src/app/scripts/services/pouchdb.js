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
      PouchDB.sync('notes', 'http://127.0.0.1:5984/notes');
      return new PouchDB('notes');})
