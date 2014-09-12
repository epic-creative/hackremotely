(function(global, navigator) {

function Storage($q) {
    this.$q = $q;
}

Storage.prototype.get = function(key) {
    var item = window.localStorage.getItem(key);
    
    try {
        return JSON.parse(item);
    }
    catch(e) {
        console.log(e.message, e.stack);
        return {};
    }
};

Storage.prototype.set = function(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
};

Storage.prototype.clear = function() {
    return window.localStorage.clear();
};

Storage.$inject = ['$q'];

angular.module('hack.services')
    .service('storage', Storage);

})(window, window.navigator);
