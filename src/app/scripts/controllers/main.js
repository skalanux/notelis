'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
.controller('MainCtrl', function ($scope, pouchdb) {
  $scope.notes = [
    'Note 1',
    'Note 2',
    'Note 3'
  ];

  $scope.addNote = function () {
    $scope.notes.push($scope.note);
    $scope.note = '';
  };





});
