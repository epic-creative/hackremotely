(function() {

function AppCtrl (Search, Geo, $location) {
    var self = this;

    this.welcome = "Hack Remotely";
    this.search = Search;
    this.geo = Geo;
    this.$location = $location;

    // TODO: Create a foursquare service for this...
    this.categories = Foursquare.categories;
    this.category = { id: null };

    this.initialize();
}

AppCtrl.prototype.queryChanged = function() {
    if (this.category.id && this.category.name !== this.query) {
        this.category = { id: null };
    }
};

AppCtrl.prototype.initialize = function() {
    this.geo.locate().then(this.located.bind(this));
};


AppCtrl.prototype.located = function(pos) {
    this.position = pos;
    
    this.send();
};

AppCtrl.prototype.send = function() {
        var self = this;

        if (!this.position) return;

        this.search.query(self.position.latitude, self.position.longitude, self.category.id ? null : self.query, self.category.id).success(function(data) {
            self.venues = data.venues;
        });
    };

AppCtrl.prototype.details = function(item) {
    this.$location.path('location/' + item.id);
};

AppCtrl.$inject = ['Search', 'Geo', '$location'];

angular.module('hack.controllers')
    .controller('AppCtrl', AppCtrl);    
})();