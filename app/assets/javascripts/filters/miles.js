angular.module("hack.app")
    .filter("miles", function() {
        return function(val) {
            return (val * 0.000621371).toFixed(2) + " mi";
        };
    })