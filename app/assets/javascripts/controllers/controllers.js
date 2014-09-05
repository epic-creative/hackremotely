(function() {

function AppCtrl (Search, Geo) {
    var self = this;

    this.welcome = "Hack Remotely";

    Geo.locate().then(function(pos) {
        self.position = pos;
    });

    this.send = function() {
        Search.query(self.position.latitude, self.position.longitude, self.search).success(function(data) {
            self.venues = data.venues;
        });
    };
}

AppCtrl.$inject = ['Search', 'Geo'];

angular.module('hack.controllers')
    .controller('AppCtrl', AppCtrl);
    
})();

