(function() {

function SearchCtrl (Search, Geo, Venue, $location, $scope) {
    var self = this;

    this.welcome = "Hack Remotely";
    this.search = Search;
    this.geo = Geo;
    this.venue = Venue;
    this.venues = this.venue.list;
    this.$location = $location;
    this.$scope = $scope;

    // TODO: Create a foursquare service for this...
    this.categories = Foursquare.categories;
    this.category = { id: null };
    this.orderProp = 'item.location.distance';

    this.initialize();
}

SearchCtrl.prototype.clickForm = function(event) {
    var self = this;

    if (event.offsetX < 75 && event.target.tagName === "FORM") {
        this.geo.locate()
            .then(this.located.bind(this))
            .then(function() {
                self.$scope.$broadcast("map:center", self.position);
            });
    }
};

SearchCtrl.prototype.queryChanged = function() {
    if (this.category.id && this.category.name !== this.query) {
        this.category = { id: null };
    }
};

SearchCtrl.prototype.initialize = function() {
    this.geo.locate().then(this.located.bind(this));
};


SearchCtrl.prototype.located = function(pos) {
    this.position = pos;

    this.geo.position.latitude = pos.latitude;
    this.geo.position.longitude = pos.longitude;
    this.geo.position.placeName = pos.placeName;
    
    this.send();
};

SearchCtrl.prototype.send = function(query) {
        var self = this;

        if (!this.position) return;

        if (query) {
            this.$location.path("/");
            
            return this.geo.search(query)
                .then(function(location) {
                    if (!location) {
                        console.log("location not found");
                        return;
                    }

                    this.geo.position.latitude = location.lat;
                    this.geo.position.longitude = location.lng;
                    this.geo.position.placeName = location.placeName;

                    // self.category.id ? null : self.query
                    self.$scope.$broadcast("map:center", {
                        latitude: +location.lat,
                        longitude: +location.lng
                    });
                    self.search.query(location.lat, location.lng, null, self.category.id).success(self.foundVenues.bind(this));
                }.bind(this));
        }
        
        this.search.query(self.position.latitude, self.position.longitude, null, self.category.id).success(self.foundVenues.bind(this));
    };

SearchCtrl.prototype.foundVenues = function(data) {
    var self = this;

    while (self.venues.length) {
        self.venues.pop();
    }
    data.venues.forEach(function(v) {
        self.venues.push(v);
    });
};

SearchCtrl.$inject = ['Search', 'Geo', 'Venue', '$location', '$scope'];

angular.module('hack.controllers')
    .controller('SearchCtrl', SearchCtrl);    
})();