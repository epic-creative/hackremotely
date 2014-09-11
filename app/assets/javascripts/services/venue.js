(function() {

function Venue($http) {
    this.$http = $http;
}

Venue.prototype.details = function(id) {
    return this.$http.get('/api/details/' + id + '.json');
}

Venue.$inject = ['$http'];

angular.module('hack.services')
    .service('Venue', Venue);

})();
