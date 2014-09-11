angular.module('hack.directives')
    .directive('address', function() {
        return {
            restrict: 'AE',
            scope: {
                location: '='
            },
            templateUrl: '/templates/directives/address.html'
        };
    });