class WelcomeController < ApplicationController
	before_filter :load_client

    def index
        @categories = @client.venue_categories :v => 20140806
	end

    private

    def load_client
        @client = Foursquare2::Client.new(:client_id => 'MK1XBNZV5LEXXNOO2YPU1LKRKUONZAQTYUPW2XL3LL5ZOJIS', :client_secret => 'T2YDCZNKDLZAZ4KPELJWR0WJ0TVYQT3EZZPX4QGMHSWSKZXW')
    end
end

# https://api.foursquare.com/v2/venues/search?client_id=MK1XBNZV5LEXXNOO2YPU1LKRKUONZAQTYUPW2XL3LL5ZOJIS&client_secret=T2YDCZNKDLZAZ4KPELJWR0WJ0TVYQT3EZZPX4QGMHSWSKZXW&v=20130815&ll=37.7833,-122.4167&query=coffee