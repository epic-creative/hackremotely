(function() {

function Search($http) {
	this.$http = $http;
}

Search.prototype.query = function(lat, lng, search) {
	return this.$http.get('/api/search.json', {
		params: {
			lat: lat,
			lng: lng,
			search: search
		}
	});
};

Search.$inject = ['$http'];

angular.module('hack.services')
	.service('Search', Search);

})();
