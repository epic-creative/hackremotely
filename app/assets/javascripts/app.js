(function () {
var app = angular.module('hack.app', 
    [
        'ngResource',
        'ngRoute',
        'hack.controllers',
        'hack.services',
        'hack.directives'
    ]);

app.config(['$routeProvider', '$locationProvider', function setup($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: '/assets/welcome/index.html'
        })
        .when('/location/:id', {
            templateUrl: '/assets/location/details.html',
            controller: 'LocationCtrl',
            controllerAs: 'vm' 
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

})();