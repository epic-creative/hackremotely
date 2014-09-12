(function(global, navigator) {

function Geo($q, $http, storage) {
	this.$q = $q;
    this.$http = $http;
    this.storage = storage;
    this.position = {};
}

Geo.prototype.locate = function(lat, lng, search) {
	var self = this,
        dfd = this.$q.defer(),
        location;

    if (location = this.storage.get("location")) {
        dfd.resolve(location);
    }
    else {
        navigator.geolocation.getCurrentPosition(function(pos) {
            self.getPlacename(pos.coords.latitude, pos.coords.longitude)
                .then(function(data) {
                    location = angular.extend(pos.coords, data);
                    self.storage.set("location", location);
                    
                    dfd.resolve(location);
                });
        });
    }

    return dfd.promise;
};

Geo.prototype.search = function(query) {
    var dfd = this.$q.defer();

    GMaps.geocode({
        address: query,
        callback: function(results, status) {
            if (status == "OK") {
                var latlng = results[0].geometry.location;
                
                dfd.resolve({
                    lat: latlng.lat(),
                    lng: latlng.lng(),
                    placeName: results[0].formatted_address
                });
            }
        }
    });

    return dfd.promise;

    // this.$http.jsonp("http://api.geonames.org/searchJSON?", {
    //     params: {
    //         q: query,
    //         maxRows: 1,
    //         username: "jcreamer898",
    //         callback: "JSON_CALLBACK"
    //     }
    // }).success(function(data) {
    //     dfd.resolve(data.geonames[0]);
    // });

    // return dfd.promise;
};

Geo.prototype.getPlacename = function(lat, lng) {
    var dfd = this.$q.defer();

    this.$http.jsonp("http://api.geonames.org/findNearbyPostalCodesJSON?", {
        params: {
            lat: lat,
            lng: lng,
            username: "jcreamer898",
            callback: "JSON_CALLBACK"
        }
    }).success(function(data) {
        
        dfd.resolve(data.postalCodes[0]);
    });

    return dfd.promise;
};

Geo.$inject = ["$q", "$http", "storage"];

angular.module("hack.services")
	.service("Geo", Geo);

})(window, window.navigator);
