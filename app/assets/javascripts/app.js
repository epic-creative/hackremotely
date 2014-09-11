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
    $routeProvider
        .when('/', {
            templateUrl: '/templates/welcome/index.html'
        })
        .when('/location/:id', {
            templateUrl: '/templates/location/details.html',
            controller: 'LocationCtrl',
            controllerAs: 'vm' 
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

})();