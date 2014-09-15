(function () {
    function VenueListCtrl(Venue, Geo, $location) {
        this.venues = Venue.list;
        this.position = Geo.position;
        this.$location = $location;
    }

    VenueListCtrl.prototype.details = function(item) {
        this.$location.path("location/" + item.id);
    };

    VenueListCtrl.$inject = ["Venue", "Geo", "$location", "$rootScope"];

    angular.module("hack.controllers")
        .controller("VenueListCtrl", VenueListCtrl);
})(); 