(function() {

function AppCtrl (Search, Geo, $location) {
    console.log("App loaded...");

    this.welcome = "Hack Remotely";
    this.search = Search;
    this.geo = Geo;
    this.$location = $location;

    this.initialize();
}

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

        this.search.query(self.position.latitude, self.position.longitude, self.query).success(function(data) {
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