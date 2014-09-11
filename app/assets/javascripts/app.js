(function () {
var app = angular.module('hack.app', 
    [
        'ngResource',
        'ngRoute',
        'hack.controllers',
        'hack.services'
    ]);

app.config(function setup($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: '/assets/welcome/index.html'
        })
        .when('/search', {
            templateUrl: '/assets/search/index.html'  
        })
        .otherwise({
            redirectTo: '/'
        });
});

})();