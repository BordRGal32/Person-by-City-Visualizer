/*jslint node: true */
'use strict';

var controllers = angular.module('Visualize.controllers', []);

controllers.controller('AppCtrl', function ($scope) {
    // initialize the visualization API and build the graph.
    var currentGraph = new window.visualizationAPI.nodeGraph();
    currentGraph.initializeGraph();

    $scope.nodeColors = {
        source : '#6d8764',
        target : '#6d8764'
    };

    $scope.colors = [ '#6d8764', '#008a00', '#00aba9', '#1ba1e2',
                        '#0050ef', '#6a00ff', '#aa00ff', '#db0073',
                        '#a20025', '#e51400', '#fa6800', '#f0a30a',
                        '#825a2c', '#000000', '#647687', '#76608a'
                    ]

    $scope.updatePerson = function() {

        var newEntry = {
            source: {
                title: $scope.source,
                color: $scope.nodeColors.source
            },
            target : {
                title : $scope.target,
                color : $scope.nodeColors.target
            }
        };
        if(!$scope.hasOwnProperty('entries')) {
            $scope.entries = [];
        }
        $scope.entries.push(newEntry);
        $scope.source = '';
        $scope.target = '';
        $('#personName').focus();

        currentGraph.expandGraph($scope.entries);

    };
});


