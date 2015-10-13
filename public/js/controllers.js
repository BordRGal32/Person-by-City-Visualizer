/*jslint node: true */
'use strict';

var controllers = angular.module('personCity.controllers', []);

controllers.controller('AppCtrl', function ($scope, $http) {
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


        $http.post('/api/buildGraphData', $scope.entries)
            .success(function(data) {
                currentGraph.expandGraph(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });

    };
});


