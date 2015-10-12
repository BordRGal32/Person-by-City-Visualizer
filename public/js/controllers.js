/*jslint node: true */
'use strict';

var controllers = angular.module('personCity.controllers', []);

controllers.controller('AppCtrl', function ($scope) {
    $scope.updatePerson = function() {
        var newEntry = {name: $scope.name, state: $scope.state};
        if(!$scope.hasOwnProperty('entries')) {
            $scope.entries = [];
        }
        $scope.entries.push(newEntry);
        $scope.name = '';
        $scope.state = '';
        $('#personName').focus();
    };
});


