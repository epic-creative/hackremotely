angular.module('hack.directives')
    .directive('hackMap', function() {
        return {
            restrict: 'A',
            scope: {
                lat: '=',
                lng: '='
            },
            link: function(scope, el, attrs) {
                var map;

                el.addClass("hack-map");
                
                map = new GMaps({
                    div: el[0],
                    lat: scope.lat,
                    lng: scope.lng
                });

                if (attrs.hasOwnProperty("marker") && typeof attrs.marker !== "undefined") {
                    map.addMarker({
                        lat: scope.lat,
                        lng: scope.lng,
                        click: function(e) {
                            alert('You clicked in this marker');
                        }
                    });
                }
            }
        };
    });