'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
.controller('MainCtrl', function ($scope, $rootScope, pouchdb) {
/*
  $scope.notes = [
    'Note 1',
    'Note 2',
    'Note 3'
  ];

  $scope.addNote = function () {
    $scope.notes.push($scope.note);
    $scope.note = '';
  };
*/

  $scope.notes = [];
  $scope.logs = [];

  $scope.addNote = function () {
   var note = $scope.note;
    var doc = {
      type: 'note',
      title: note.title,
      done: false,
      createdAt: new Date().getTime(),
      _id: new Date().toISOString()
    };
    pouchdb.put(doc)
      .then(function (note) {
        pouchdb.get(note.id)
          .then(function(note){
            $scope.notes.push({doc: note});
            $rootScope.$apply();
          });
      });
    note.title = '';
  };

  $scope.delete = function (doc, index) {
    pouchdb.remove(doc)
      .catch(function (error) {
        return error;
      })
    .then(function () {
      $scope.notes.splice(index, 1);
      $rootScope.$apply();
    });
  };

  $scope.edit = function (note) {
    var doc = {
      title : note.doc.title,
      done : note.doc.done,
      editedAt : new Date().getTime()
    };

    pouchdb.put(doc, note.doc._id, note.doc._rev)
      .then(function () {
        note.editMode = false;
        $rootScope.$apply();
      });
  };

  $scope.getAll = function () {
    pouchdb.allDocs({include_docs: true, descending: true})
      .then(function (notes){
        $scope.notes = notes.rows;
        $rootScope.$apply();
      });
  };

  $scope.logsListener = (function () {
    pouchdb.changes({
      live: true
    }).on('change', function(change) {
      $scope.logs.push(change);
      $rootScope.$apply();
    });
  })();

  $scope.getAll();






});
