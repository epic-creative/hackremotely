angular.module('hack.directives')
    .directive('address', function() {
        return {
            restrict: 'AE',
            scope: {
                location: '='
            },
            templateUrl: '/assets/directives/address.html'
        };
    });