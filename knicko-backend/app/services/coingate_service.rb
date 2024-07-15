require 'http'
require 'json'
require 'dotenv/load'

class CoingateService
  def self.create_order(order_params)
    response = HTTP.auth("Bearer #{api_key}")
                   .post(api_url, form: order_params)

    parse_response(response)
  end

  def self.get_order(order_id)
    url = "#{api_url}/#{order_id}"
    response = HTTP.auth("Bearer #{api_key}")
                   .get(url)

    parse_response(response)
  end

  def self.get_orders_list
    url = "#{api_url}?per_page=100&page=1&sort=created_at_desc"
    response = HTTP.auth("Bearer #{api_key}")
                   .get(url)

    parse_response(response)
  end

  private

  def self.api_key
    ENV.fetch('COINGATE_API_KEY') { raise "COINGATE_API_KEY is not set in environment variables" }
  end

  def self.api_url
    ENV.fetch('COINGATE_API_URL') { raise "COINGATE_API_URL is not set in environment variables" }
  end

  def self.parse_response(response)
    if response.status.success?
      JSON.parse(response.body.to_s)
    else
      { error: response.status, message: response.body.to_s }
    end
  end
end