class ApiController < ApplicationController
    before_filter :load_client
    after_filter :cors_set_access_control_headers

    def search
        @venues = @client.search_venues(
            :ll => location[:lat].to_s + ',' + location[:lng].to_s, 
            :query => search_query[:search],
            :v => 20140806,
            :categoryId => search_query[:categoryId]
        )

        # @venues.venues.select! { |v| v.verified == true }

        respond_to do |format|
            format.json { render json: @venues }
        end
    end

    def details
        venue = @client.venue(params[:id], :v => 20140806)

        respond_to do |format|
            format.json { render json: venue }
        end
    end

    private

    def load_client
        @client = Foursquare2::Client.new(:client_id => 'MK1XBNZV5LEXXNOO2YPU1LKRKUONZAQTYUPW2XL3LL5ZOJIS', :client_secret => 'T2YDCZNKDLZAZ4KPELJWR0WJ0TVYQT3EZZPX4QGMHSWSKZXW')
    end

    def location
        params.permit(:lat, :lng)
    end

    def search_query
        params.permit(:search, :categoryId)
    end

    def cors_set_access_control_headers
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end
end

# https://api.foursquare.com/v2/venues/search?client_id=MK1XBNZV5LEXXNOO2YPU1LKRKUONZAQTYUPW2XL3LL5ZOJIS&client_secret=T2YDCZNKDLZAZ4KPELJWR0WJ0TVYQT3EZZPX4QGMHSWSKZXW&v=20130815&ll=37.7833,-122.4167&query=coffee