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

  $scope.notes = [];
  $scope.newNote = {'title':"" ,'body':""};
  $scope.addNote = function (note) {
    var doc = {
      type: 'note',
      title: note.title,
      body: note.body,
      done: false,
      createdAt: new Date().getTime(),
      _id: new Date().toISOString()
    };
    pouchdb.put(doc)
      .then(function (note) {
        pouchdb.get(note.id)
          .then(function(note){
            $scope.notes.push(note);
            $rootScope.$apply();
          });
      });
    note.title = '';
    note.body = '';
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

  $scope.editNote = function (note) {
    $scope.newNote.title = note.title;
    $scope.newNote.body = note.body;
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

  pouchdb.changes({
      live: true,
      onChange: function (change) {
        if (!change.deleted) {
          pouchdb.get(change.id, function(err, doc) {
            if (err) console.log(err);
            $scope.$apply(function() { //UPDATE
              for (var i = 0; i < $scope.notes.length; i++) {
                if ($scope.notes[i]._id === doc._id) {
                  $scope.notes[i] = doc;
                  return;
                }
              } // CREATE / READ
              $scope.notes.push(doc);
            });
          })
        } else { //DELETE
          $scope.$apply(function () {
            for (var i = 0; i<$scope.notes.length; i++) {
              if ($scope.notes[i]._id === change.id) {
                $scope.notes.splice(i,1);
              }
            }
          })
        }
      }
    });

  $scope.getAll();






});
