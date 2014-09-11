//= require application
//= require angular-mocks

describe('services', function() {
    var AppCtrl,
        $httpBackend;

    beforeEach(module('hack.services'));

    beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // backend definition common for all tests
        $httpBackend.when('GET', '/auth.py')
            .respond({userId: 'userX'});
    }));

    describe('search', function() {
        it('should search by categories', inject(function(Search) {
            //expect(Search.categories.length).toBe(3);
        }));
    });
});

//https://api.foursquare.com/v2/venues/categories