class ApiController < ApplicationController
    def search
        client = Foursquare2::Client.new(:client_id => 'MK1XBNZV5LEXXNOO2YPU1LKRKUONZAQTYUPW2XL3LL5ZOJIS', :client_secret => 'T2YDCZNKDLZAZ4KPELJWR0WJ0TVYQT3EZZPX4QGMHSWSKZXW')

        @venues = client.search_venues(
            :ll => location[:lat].to_s + ',' + location[:lng].to_s, 
            :query => search_query[:search],
            :v => 20140806
        )

        respond_to do |format|
            format.json { render json: @venues }
        end
    end

    private

    def location
        params.permit(:lat, :lng)
    end

    def search_query
        params.permit(:search)
    end
end

# https://api.foursquare.com/v2/venues/search?client_id=MK1XBNZV5LEXXNOO2YPU1LKRKUONZAQTYUPW2XL3LL5ZOJIS&client_secret=T2YDCZNKDLZAZ4KPELJWR0WJ0TVYQT3EZZPX4QGMHSWSKZXW&v=20130815&ll=37.7833,-122.4167&query=coffee