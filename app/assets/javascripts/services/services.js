(function() {

function Search($http) {
	this.$http = $http;
}

Search.prototype.query = function(lat, lng, search) {
	return this.$http.get('/welcome/search.json', {
		params: {
			lat: lat,
			lng: lng,
			search: search
		}
	});
};

angular.module('hack.services', [])
	.service('Search', Search);

})();
