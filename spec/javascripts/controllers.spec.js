//= require application
//= require angular-mocks

describe('controllers', function() {
    beforeEach(module('hack.controllers'));

    it('should work', inject(function($controller) {
        var AppCtrl = $controller('AppCtrl', {
            Search: function() {},
            Geo: {
                locate: function() {
                    return {
                        then: function() {}
                    }
                }
            }
        });

        expect(AppCtrl).toBeDefined();
    }));
});