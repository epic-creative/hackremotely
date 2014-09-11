//= require application
//= require angular-mocks

describe('controllers', function() {
    var AppCtrl;

    beforeEach(module('hack.controllers'));

    beforeEach(inject(function($controller) {
        AppCtrl = $controller('AppCtrl', {
            Search: {
                query: function() {
                    return {
                        success: function(fn) {
                            fn([{}, {}, {}]);
                        }
                    }
                }
            },
            Geo: {
                locate: function() {
                    return {
                        then: function(fn) {
                            fn({
                                lat: '37',
                                lng: '-41'
                            });
                        }
                    }
                }
            }
        });
    }));

    it('should work', function() {
        expect(AppCtrl).toBeDefined();
    });

    it('should get the position', function() {
        expect(AppCtrl.position.lat).toBe('37');
    });
});