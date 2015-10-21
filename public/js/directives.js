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
        template:   '<div class="dropdown btn-group">' +
        '<button class="btn sel-color-btn"><div class=sel-color ng-style="selColor"></div></button>' +
        '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
        '<span class="caret"></span></button>' +
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
        '<li ng-repeat="color in colors"><a ng-click="dropboxSelected(color)" style="height:20px; background:{{color}}"></a></li>' +
        '</ul></div>' ,
        link: function(scope, elem, attrs) {
            var list = elem.find('ul')[0];
            scope.dropboxSelected = function(color) {
                scope.selectedcolor = color;
                scope.selColor = {
                    background : color
                };
            }

        }

    };
});

directives.directive('setMetadata', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function(scope, elem, attrs) {
            scope.overlayStyle = {};
            scope.overlayStyle.width = window.screen.width + 'px';
            scope.overlayStyle.height = window.screen.height + 'px';
            scope.overlayStyle['z-index'] = 9999;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: '<div class="set-metadata-modal" ng-show="show">' +
                    '<div class="overlay" ng-style="overlayStyle" ng-click="hideModal()"></div>' +
                    '<div class="set-metadata-modal-dialog">' +
                        '<div class="set-metadata-modal-close" ng-click="hideModal()">X</div>' +
                        '<div class="set-metadata-modal-dialog-content" ng-transclude></div>' +
                    '</div>' +
                '</div>'
    };
});
