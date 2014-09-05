(function(global, navigator) {

function Geo($q) {
	this.$q = $q;
}

Geo.prototype.locate = function(lat, lng, search) {
	var dfd = this.$q.defer();

    navigator.geolocation.getCurrentPosition(function(pos) {
        dfd.resolve(pos.coords);
    });

    return dfd.promise;
};

Geo.$inject = ['$q'];

angular.module('hack.services')
	.service('Geo', Geo);

})(window, window.navigator);
