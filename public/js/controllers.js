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
    $scope.colors = [ '#6d8764', '#008a00', '#00aba9', '#1ba1e2',
                        '#0050ef', '#6a00ff', '#aa00ff', '#db0073',
                        '#a20025', '#e51400', '#fa6800', '#f0a30a',
                        '#825a2c', '#000000', '#647687', '#76608a'
                    ]

    $scope.selectedItem;
    $scope.dropboxitemselected = function (item) {

        $scope.selectedItem = item;
        alert($scope.selectedItem);
    }
});

