require 'faraday'

COINGATE_API_KEY = ENV['COINGATE_API_KEY']
COINGATE_ENVIRONMENT = Rails.env.production? ? 'live' : 'sandbox'

COINGATE_URL = COINGATE_ENVIRONMENT == 'sandbox' ? 'https://api-sandbox.coingate.com' : 'https://api.coingate.com'

$coingate_client = Faraday.new(url: COINGATE_URL) do |conn|
  conn.request :url_encoded
  conn.response :json, parser_options: { symbolize_names: true }
  conn.adapter Faraday.default_adapter
  conn.headers['Authorization'] = "Token #{COINGATE_API_KEY}"
end