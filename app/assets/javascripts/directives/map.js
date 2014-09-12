angular.module('hack.directives')
    .directive('hackMap', function() {
        return {
            restrict: 'A',
            scope: {
                lat: '=',
                lng: '=',
                options: '&'
            },
            link: function(scope, el, attrs) {
                var map, options, img;

                el.addClass("hack-map");
                
                if (attrs.hasOwnProperty("static") && typeof attrs['static'] ) {
                    options = angular.extend({
                        size: [attrs.width || el.width(), attrs.height || el.height()],
                        lat: scope.lat,
                        lng: scope.lng,
                        scale: 2
                    }, scope.options());

                    if (attrs.hasOwnProperty("marker") && typeof attrs.marker !== "undefined") {
                        options.markers = [{
                            lat: scope.lat,
                            lng: scope.lng
                        }]
                    }

                    url = GMaps.staticMapURL(options);

                    img = document.createElement("img");
                    img.src = url;

                    el.append(img);
                }
                else {
                    options = angular.extend({
                        div: el[0],
                        lat: scope.lat,
                        lng: scope.lng
                    }, scope.options());

                    map = new GMaps(options);
                }
                
                scope.$on("map:center", function(event, position) {
                    map.panTo({
                        lat: position.latitude,
                        lng: position.longitude
                    });
                    map.panBy( el.width() / 4, el.height() / 4 );
                    
                });

                if (attrs.hasOwnProperty("marker") && typeof attrs.marker !== "undefined") {
                    map.addMarker({
                        lat: scope.lat,
                        lng: scope.lng,
                        click: function(e) {
                            alert('You clicked in this marker');
                        }
                    });
                    map.panBy( el.width() / 4, el.height() / 4 );
                }
            }
        };
    });