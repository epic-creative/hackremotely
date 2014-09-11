(function () {
    function LocationCtrl($routeParams, Venue) {
        this.$routeParams = $routeParams;
        this.venue = Venue;

        this.initialize();
    }

    LocationCtrl.prototype.initialize = function() {
        this.venue.details(this.$routeParams.id)
            .success(this.venueDone.bind(this));
    };

    LocationCtrl.prototype.venueDone = function(data) {
        this.details = data;
    }

    LocationCtrl.$inject = ['$routeParams', 'Venue'];

    angular.module('hack.controllers')
        .controller('LocationCtrl', LocationCtrl);
})(); 