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
            controller: 'VenueListCtrl',
            controllerAs: 'vm',
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
}])
.run(['$rootScope', function($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function(event, current) {
        if (current.$$route.controller) $rootScope.bodyClass = current.$$route.controller.toLowerCase();
    });
}]);

})();