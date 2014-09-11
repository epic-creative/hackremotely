angular.module('hack.directives')
    .directive('hackAutosuggest', function() {
        return {
            restrict: 'A',
            scope: {
                suggestions: '=',
                category: '=',
                query: '=',
                search: '&'
            },
            link: function(scope, el, attrs) {
                var categories = [];

                Foursquare.categories.map(function(cat) {
                    return cat.categories;
                }).forEach(function(array) {
                    categories = categories.concat(array);
                });

                el.autocomplete({
                    source: function(req, res) {
                        var cats = categories.map(function(cat) {
                            return {
                                label: cat.name,
                                value: cat.id
                            };
                        }).filter(function(cat) {
                            return cat.label.toLowerCase().indexOf(req.term.toLowerCase()) > -1;
                        });

                        res(cats);
                    },
                    focus: function( e, ui ) {
                        $( this )
                            .val( ui.item.label );

                        return false;
                    },
                    select: function(event, ui) {
                        scope.$apply(function() {
                            scope.category = categories.filter(function(cat) {
                                return cat.id === ui.item.value;
                            })[0];

                            scope.query = ui.item.label;
                            scope.search();
                        });

                        return false;
                    }
                });
            }
        };
    });