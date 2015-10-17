/*jslint node: true */
'use strict';

var controllers = angular.module('personCity.controllers', []);

controllers.controller('AppCtrl', function ($scope) {
    // initialize the visualization API and build the graph.
    var currentGraph = new window.visualizationAPI.nodeGraph();
    currentGraph.initializeGraph();

    $scope.updatePerson = function() {

        var newEntry = {name: $scope.name, state: $scope.state};
        if(!$scope.hasOwnProperty('entries')) {
            $scope.entries = [];
        }
        $scope.entries.push(newEntry);
        $scope.name = '';
        $scope.state = '';
        $('#personName').focus();

        currentGraph.expandGraph($scope.entries);

    };
});

controllers.controller('SubjectDropDownController', function($scope) {
    $scope.colors = ['#076bb6', '#accbe8', '#ae70af',  '#551A8B',
                    '#00CC00','#cbd48c', '#90ee90',  '#a9b2b1',
                    '#9eceb4', '#e66665',  '#f47d43', '#ffd602',
                    '#FF3300','#ff69b4', '#DDA0DD', '#8B668B' ]

    $scope.selectedItem;
    $scope.dropboxitemselected = function (item) {

        $scope.selectedItem = item;
        alert($scope.selectedItem);
    }
});

