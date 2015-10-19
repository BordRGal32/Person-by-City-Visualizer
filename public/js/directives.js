/*jslint node: true */
'use strict';

var directives = angular.module('Visualize.directives', []);

directives.directive('colorPicker', function() {
    return {
        scope: {
            colors: '=',
            selectedcolor: '='
        },
        restrict: 'AE',
        replace: true,
        template:   '<div class="dropdown colorpicker">' +
        ' <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
        '<span class="caret"></span></button>' +
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
        '<li ng-repeat="color in colors"><a ng-click="dropboxSelected(color)" style="height:20px; background:{{color}}"></a></li>' +
        '</ul></div>' ,
        link : function(scope, elem, attrs) {
            var list = elem.find('ul')[0];

            scope.dropboxSelected = function(color) {
                scope.selectedcolor = color;
            }

        }

    };
});
