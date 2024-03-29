angular.module("hack.directives")
    .directive("hackStars", ["debounce", function(debounce) {
        return {
            restrict: "E",
            scope: true,
            templateUrl: '/templates/directives/stars.html',
            link: function(scope, el, attrs) {
                scope.stars = [1, 1, 1, 1, 0];

                el.on("mousemove", debounce(function(event) {
                    var index; 
                    if (event.target.tagName === "I") {
                        index = $(event.target).index();
                        scope.stars = [1, 1, 1, 1, 1]
                        
                        for(var i = index + 1; i < scope.stars.length; i++) {
                            scope.stars[i] = 0;
                        }

                        scope.$apply();
                    }
                }, 50));

                el.on("mouseleave", function() {
                    scope.stars = [1, 1, 1, 1, 0];

                    scope.$apply();
                });
            }
        };
    }]);